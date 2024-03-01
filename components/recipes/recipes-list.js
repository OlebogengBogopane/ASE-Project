import React, { useState, useEffect } from "react";
import RecipesItems from "./recipes-items";
import RecipesFavItems from "./recipes-FavItems";
import styles from "./recipes-list.module.css";
import { useRouter } from "next/router";
import SortByOrder from "../sorting/sortByOrder";

/**
 * 
 * @param {Array } recipes  collection from MongoDB compass.
 * @param {Number } patchNo page number to control numbe rof loading recipes
 * @param {Array } favRecipes array that stores favorite recipes
 * @param {string} search input string used to search for specific recipes
 * @returns RecipeList component and RecipeFavItems components
 * This component displays preview of 100 recipes per page, and when each recipe is clicked it suppose to
 * display recipe details by description, ingredients, instructons, allergens and tags
 */

function RecipeList({ recipes, patcheNo, favRecipes, search, setLoading }) {
  const router = useRouter();

  return (
    <div className={styles.container}>

      <div className={styles.container}>
        <br />
        <SortByOrder />
        {recipes.length === 0 && <h5>No Filter Recipes Matching</h5>}
        <ul className={styles.list}>
          {(router.pathname.includes('/recipes/')) ?
            recipes.map((recipe) => (
              <RecipesItems
                key={recipe._id}
                id={recipe._id}
                patcheNo={patcheNo}
                title={recipe.title}
                image={recipe.images[0]}
                description={recipe.description}
                prep={recipe.prep}
                cook={recipe.cook}
                category={recipe.category}
                servings={recipe.servings}
                published={recipe.published}
                favRecipes={favRecipes}
                search={search}
                setLoading={setLoading}
              />
            ))
            :
            recipes.map((recipe) => (
              <RecipesFavItems
                key={recipe._id}
                id={recipe._id}
                patcheNo={patcheNo}
                title={recipe.title}
                image={recipe.images}
                description={recipe.description}
                prep={recipe.prep}
                cook={recipe.cook}
                category={recipe.category}
                servings={recipe.servings}
                published={recipe.published}
                favRecipes={favRecipes}
                setLoading={setLoading}
              />))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeList;

