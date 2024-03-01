import { runFav, runCategories, runFilter2, runHistory, runNumberOfRecipes } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LoadingState from '@/components/Loading/loading-state';
import Navbar from '@/components/header/navbar';
import styles from '@/components/header/summary.module.css'
import Footer from '@/components/footer/footer';
//import { useEffect } from 'react';

/**
 * Recipe Component
 * @param {Object} props - Properties passed to the component
 * @returns {JSX.Element} - Rendered React component
 */

function Recipe({ recipes, favRecipes, categories, patcheNo, searchChar, history, tags, ingredients, categoryfilter, steps, recipeNumber}) {
  const router = useRouter();
  const { recipeId } = router.query
  const [isSorting, setIsSorting] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const historyData = history.map((data) => {
    return data.searchWord
  })

  const changePathname = (pageNumber) => {
    const { query } = router
    const newUrl = {
      pathname: `/recipes/${pageNumber}`,
      query: { ...query },
    };
    router.push(newUrl)
  };


  useEffect(() => {
    setIsSorting(false)
  }, [router])

  return (
    <>
      {
        isLoading && <LoadingState />
      }

      <Navbar categories={categories} pageNo={patcheNo} searchChar={searchChar} setIsSorting={setIsSorting} isSorting={isSorting} history={historyData} filterByTags={tags} filterByIngredients={ingredients} categoryfilter={categoryfilter} filterBySteps={steps} />

      <div style={{ position: 'relative' }}>
        <img className={styles.image} src="/images/food-image.jpg" alt="logo" width='100%' height='40%' />

        {/* Summary with opacity */}
        <div className={styles.opacityOverlay}>
          <div className={styles.footer}>
            <h1 className={styles.summaryTitle}>Explore Our Delicious Recipes</h1>
            <p className={styles.summaryText}>
              <span className={styles.italianoFont}>
                {`Discover the art of cooking and create memorable dining experiences for yourself and your loved ones. Whether you're a seasoned chef or just starting your culinary journey, our recipes are designed to inspire, educate, and satisfy your taste buds.`}
              </span>
            </p>
          </div>
        </div>
      </div>

      <RecipeList recipes={recipes} patcheNo={recipeId} favRecipes={favRecipes} search={searchChar} setLoading={setLoading}/>

      <div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          {recipeId > 1 && (
            <button onClick={() => changePathname(parseInt(recipeId) - 1)} className={styles.button}> Previous </button>
          )}
          {recipes.length === 100 && (
            <button onClick={() => changePathname(parseInt(recipeId) + 1)} className={styles.button}> {`Next (${patcheNo}/${recipeNumber-patcheNo})`} </button>
          )}
        </div>

      </div>
      <br />
      <Footer />
    </>
  )
}

/**
 * Server-side function to fetch data for the component
 * @param {Object} context - Context object from Next.js
 * @returns {Object} - Props to be passed to the component
 */

export async function getServerSideProps(context) {
  const finalSearchString = {}
  const sort1 = context.query.sort
  const filterByTags = context.query.tags
  const filterByCategories = context.query.categories
  const filterByIngredients = context.query.ingredients
  const filterBySteps = context.query.steps

  const searchChar = context.query.search === undefined ? null : context.query.search
  const sortChar = (sort1 === 'undefined' || sort1 === undefined) ? {} : { [sort1.slice(0, sort1.indexOf('_'))]: sort1.slice(sort1.indexOf('_') + 1, sort1.length) }
  searchChar ? finalSearchString.title = { $regex: searchChar, $options: 'i' } : undefined
  filterByTags ? finalSearchString.tags = { $all: (filterByTags.split(',')) } : undefined
  filterByCategories ? finalSearchString.category = filterByCategories : undefined
  filterByIngredients ? (filterByIngredients.split(',')).map((ingredient) => finalSearchString[`ingredients.${ingredient}`] = { $exists: true }) : undefined
  filterBySteps ? finalSearchString.instructions = { $size: parseInt(filterBySteps) } : undefined

  const patcheNo = context.params.recipeId;
  const favRecipes = await runFav(1);
  const recipeNumber = await runNumberOfRecipes();
  const categories = await runCategories();
  const history = await runHistory();
  const filteredCharacters = await runFilter2(patcheNo, finalSearchString, sortChar);
 

  const recipes = filteredCharacters
  const tags = filterByTags ? filterByTags.split(',') : []
  const ingredients = filterByIngredients ? filterByIngredients.split(',') : []
  const categoryfilter = filterByCategories ? filterByCategories : ''
  const steps = filterBySteps ? filterBySteps : ''

  return {
    props: {
      steps,
      categoryfilter,
      ingredients,
      tags,
      recipes,
      favRecipes,
      categories,
      patcheNo,
      searchChar,
      history,
      recipeNumber,
    },
  };
}

export default Recipe;