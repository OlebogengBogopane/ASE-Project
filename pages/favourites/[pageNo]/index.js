import { runFav, runCategories } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer/footer';
import LoadingState from '@/components/Loading/loading-state';

/**
 * Recipe Component
 * ----------------
 * This component displays a list of favorite recipes, along with navigation buttons for pagination.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.favRecipes - An array of favorite recipes.
 * @param {number} props.patcheNo - The current page number for pagination.
 * @param {Array} props.historyData - An array of search history data.
 * @param {Array} props.categories - An array of recipe categories.
 * @returns {JSX.Element} - The rendered Recipe component.
 */

function Recipe({ favRecipes, patcheNo, historyData, categories }) {

  const [noFavorites, setNoFavorites] = useState(favRecipes.length === 0);
  const [isSorting, setIsSorting] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  /**
  * useEffect to update noFavorites state when favRecipes change.
  */

  useEffect(() => {
    setNoFavorites(favRecipes.length === 0);
  }, [favRecipes]);


  return (
    <>
     {favLoading && <LoadingState/>}
      <Navbar categories={categories} setIsSorting={setIsSorting} isSorting={isSorting} />
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0', fontSize: '36px', fontWeight: 'bold', color: '#333', marginTop: '120px' }}>
        Favourites
      </h1>

      {noFavorites ? ( // Display message when there are no favorites
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '100px 0', fontSize: '24px', color: '#999' }}>No Favourites Available</h1>
      ) : (
        <>

          {/* Display the list of favorite recipes */}
          <RecipeList recipes={favRecipes} patcheNo={patcheNo} favRecipes={favRecipes} setLoading={setFavLoading}/>


          {/* Navigation for paginating through favorite recipes */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0' }}>
            {patcheNo > 1 && (
              <Link href={`/favourites/${parseInt(patcheNo) - 1}`}>
                <button className="maroon-button">Previous</button>
              </Link>
            )}

            {favRecipes.length === 100 && (
              <Link href={`/favourites/${parseInt(patcheNo) + 1}`}>
                <button className="maroon-button">Next</button>
              </Link>
            )}
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

// Server-side data fetching
export async function getServerSideProps(context) {
  const patcheNo = context.params.pageNo;
  const sort1 = context.query.sort
  const categories = await runCategories();
  const sortChar = (sort1 === 'undefined' || sort1 === undefined) ? {} : { [sort1.slice(0, sort1.indexOf('_'))]: sort1.slice(sort1.indexOf('_') + 1, sort1.length) }
  const favRecipes = await runFav(parseInt(patcheNo), sortChar);
  return {
    props: {
      categories,
      patcheNo,
      favRecipes,
    },
  };
}

export default Recipe;