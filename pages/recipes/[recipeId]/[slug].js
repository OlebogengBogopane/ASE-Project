
import React, { useState } from 'react';
import UpdateDescription from '@/components/description/description';
import { run2, runFilter, runFav } from '../../../fetching-data/data';
import styles from '@/stylespages/RecipeDetails.module.css';
import RecipesInstructions from '@/components/instructions/instructions';
import ErrorComponent from '@/components/Errors/errors';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer/footer';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faHeart as regularHeart, faHeartBroken as brokenHeart } from '@fortawesome/free-solid-svg-icons';

/**
 * Recipe Component
 * ----------------
 * This component displays details of a specific recipe, including title, image, description,
 * allergens, tags, ingredients, and instructions.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.recipeId - The unique identifier of the recipe.
 * @param {Array} props.favRecipes - An array of favorite recipes.
 * @param {Array} props.data1 - An array containing recipe data.
 * @param {Array} props.allergens - An array containing allergen data.
 * @returns {JSX.Element} - The rendered Recipe component.
 */

const Recipe = ({ recipeId, favRecipes, data1, allergens }) => {
  const [favRecipeIds, setFavRecipeIds] = useState(favRecipes.map((recipe) => recipe._id))
  const [favToggle, setFavToggle] = useState(favRecipeIds.includes(recipeId) ? true : false)
  const [imageIndex, setImageIndex] = useState(0);
  const recipes = data1[0];
  const [hoverToggle, setHoverToggle] = useState(false)
  // Convert the ingredients object into an array of strings.

  const ingredientsArray = Object.entries(recipes.ingredients).map(([ingredient, amount]) => `${ingredient}: ${amount}`);
  const allergensForRecipe = allergens ? allergens.filter(allergen =>
    ingredientsArray.some(ingredient => ingredient.includes(allergen))
  ) : [];
  const hours = Math.floor(recipes.cook / 60);
  const minutes = recipes.cook % 60;

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(recipes.description);

  /**
   * Handles the save action for updating the recipe description.
   *
   * @param {string} updatedDescription - The updated description.
   * @returns {void}
   */

  const handleSaveDescription = async (updatedDescription) => {
    try {
      if (!updatedDescription.trim()) {
        setEmptyDescriptionError(true);
        return; // Do not proceed if the description is empty
      }

      // If the update is successful, show the success notification.
      console.log("Updated Description:", updatedDescription);
      setEditedDescription(updatedDescription);
      setIsEditingDescription(false);
      setShowSuccessNotification(true);

      // Simulate closing the success notification after a few seconds (you can adjust the duration)
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 5000);
    } catch (error) {
      console.error("Error updating description:", error);
      setShowErrorNotification(true);
    }
  };

  /**
   * Converts tags array to a comma-separated string.
   */

  const tagsString = recipes.tags.join(', ');
  const recipeToBeInsertedToFav = {
    _id: recipeId,
    title: recipes.title,
    images: [recipes.images[0]],
    description: recipes.description,
    prep: recipes.prep,
    cook: recipes.cook,
    category: recipes.category,
    servings: recipes.servings,
    published: recipes.published
  }

  /**
   * Adds the recipe to favorites.
   */

  async function addToFavourite(recipeData) {
    const response = await fetch('/api/favourites', {
      method: 'POST',
      body: JSON.stringify(recipeData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    else {
      setFavToggle(!favToggle)
    }

  }

  /**
   * Removes the recipe from favorites.
   */

  async function removeFromFavourite(recipeId) {
    const response = await fetch('/api/favourites', {
      method: 'DELETE',
      body: JSON.stringify(recipeId),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Recipe failed to delete");
    }
    else if (response.ok) {
      setFavToggle(!favToggle)
    }
  }

  /**
   * Renders the Recipe component.
   *
   * @returns {JSX.Element} - The rendered JSX element.
   */

  return (
    <>
      <Navbar />
      <div className={styles.recipeDetails}>
        <div className={styles.leftColumn}>

          <br />
          <h1 className={styles.recipeTitle}>{recipes.title}</h1>
          <br />
          {/* <img className={styles.recipeImage} src={recipes.images[0]} alt={recipes._id} width={200} height={200} /> */}
          <div style={{ position: 'relative'}}>
            <img src={recipes.images[imageIndex]} className={styles.recipeImage} alt="recipe image" />
            <div>
              <div>
                {imageIndex > 0 && <div style={{ position: 'absolute', left: '0', top: '45%' }}>
                  <Button startIcon={<ArrowBackIosIcon sx={{ color: 'white' }} />} onClick={() => setImageIndex(imageIndex - 1)}></Button>
                </div>}

              </div>

              <div>
                {imageIndex < (recipes.images.length - 1) && <div className={styles.rightArrow} style={{ position: 'absolute', right: '10%', top: '45%' }}>
                  <Button startIcon={<ArrowForwardIosIcon sx={{ color: 'white' }} />} onClick={() => setImageIndex(imageIndex + 1)}></Button>
                </div>}
              </div>
              
              <div className={styles.heartIcon}>
                {favToggle ? (
                  <>
                    {!hoverToggle && (
                      <FontAwesomeIcon onMouseEnter={() => setHoverToggle(!hoverToggle)} icon={solidHeart} size="2x" color="red" />
                    )}
                    {hoverToggle && (
                      <FontAwesomeIcon
                        onMouseLeave={() => setHoverToggle(!hoverToggle)}
                        icon={brokenHeart}
                        size="2x"
                        color="red"
                        onClick={() => removeFromFavourite({ _id: recipeId })}
                        shake
                      />
                    )}
                  </>
                ) : (
                  <FontAwesomeIcon icon={regularHeart} size="2x" color="grey" onClick={() => addToFavourite(recipeToBeInsertedToFav)} />
                )}
              </div>
              <p className={styles.imageNo}><b>{`${imageIndex+1}/${recipes.images.length}`}</b></p>
            </div>
          </div>

          <UpdateDescription description={recipes.description} recipeId={recipeId} />

          <p>Cooking time: {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ` : ''} {minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} ` : ''}</p>
          <h2 className={styles.allergens}>Allergens</h2>
          {allergensForRecipe.length > 0 ? (
            <ul>
              {allergensForRecipe.map((allergen, index) => (
                <li key={index}>{allergen}</li>
              ))}
            </ul>
          ) : (
            <p>No allergens present in this recipe.</p>
          )}
          <h2 className={styles.tags}>Tags</h2>
          <div className={styles.tagsContainer}>
            {tagsString ? (
              <p className={styles.tagBlock}>{tagsString}</p>
            ) : (
              <ErrorComponent message="Failed to load tags" />
            )}
          </div>

        </div>

        <div className={styles.rightColumn}>
          <div className={styles.rightContentContainer}>


            <h2 className={styles.ingredients}>Ingredients</h2>
            <ul>
              {ingredientsArray.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <h2 className={styles.instructions}>Instructions</h2>
            <RecipesInstructions instructions={recipes.instructions} recipeId={recipeId} />
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const recipeId = context.params.slug;
  const recipedataNo = context.params.recipeId;

  const docs2 = await run2();
  const data1 = await runFilter(recipedataNo, { _id: recipeId })
  const favRecipes = await runFav(1);

  return {
    props: {
      recipeId,
      favRecipes,
      data1,
      allergens: docs2 && docs2.length > 0 ? docs2[0] : null,
    },
  }
}
export default Recipe;