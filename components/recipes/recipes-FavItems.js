import styles from './recipes-items.module.css';
import React from 'react';
import Button from '../ui/button/button';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faHeartBroken as brokenHeart } from '@fortawesome/free-solid-svg-icons';


function RecipesFavItems(props) {
    const { id, title, prep, cook, category, servings, published, image, patcheNo, setLoading } = props
    const [removeFromFav, setRemoveFromFav] = useState(true)
    const [hoverToggle, setHoverToggle] = useState(false)
    const [removeNotification, setRemoveNotification] = useState(null);

    const publishedDate = new Date(published);
    const formattedPublishedDate = publishedDate.toISOString().split('T')[0];

    const hours = Math.floor(cook / 60);
    const minutes = cook % 60;

    const prepHours = Math.floor(prep / 60);
    const prepMinutes = prep % 60;

    // Calculate total hours and total minutes
    const totalHours = prepHours + hours;
    const totalMinutes = prepMinutes + minutes;

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
            setRemoveFromFav(false)
            // Set notification when recipe is removed from favorites
            setRemoveNotification('Recipe removed from favorites!');
            // Clear the notification after a few seconds (adjust as needed)
            setTimeout(() => setRemoveNotification(null), 5000);
        }
    }

    return (
        <>
            {/* Remove notification */}
            {removeNotification && (
                <div className={styles.removeNotification}>{removeNotification}</div>
            )}
            {removeFromFav &&
                <div className={styles.link}>

                    <li className={styles.item}>
                        <div className={styles.heartIcon}>

                            {!hoverToggle && (
                                <FontAwesomeIcon onMouseEnter={() => setHoverToggle(!hoverToggle)} icon={solidHeart} size="2x" color="red" />
                            )}
                            {hoverToggle && (
                                <FontAwesomeIcon
                                    onMouseLeave={() => setHoverToggle(!hoverToggle)}
                                    icon={brokenHeart}
                                    size="2x"
                                    color="red"
                                    onClick={() => removeFromFavourite({ _id: id })}
                                    shake
                                />
                            )}

                        </div>
                        <img src={image} alt={id} width={400} height={200} className={styles.imageContainer} />
                        <h2>{title}</h2>

                        <div >
                            <div className={styles.cookingTime}>
                                <div>
                                    <div className={styles.cookingTimeLabel}>
                                        Preparation:
                                        <br />
                                        {prepHours > 0 ? `${prepHours} hr${prepHours > 1 ? 's' : ''} ` : ''}
                                        {prepMinutes > 0 ? `${prepMinutes} min${prepMinutes > 1 ? 's' : ''}` : (prepHours === 0 ? '0 min' : '')}
                                    </div>
                                    <div className={styles.cookingTimeLabel}>
                                        Cooking time:
                                        <br />
                                        {hours > 0 ? `${hours} hr${hours > 1 ? 's' : ''} ` : ''}
                                        {minutes > 0 ? `${minutes > 59 ? `${Math.floor(minutes / 60)} hr${minutes % 60 !== 0 ? ' ' : ''}${minutes % 60 !== 0 ? `${minutes % 60} min` : ''}` : `${minutes} min`}` : (hours === 0 ? '0 min' : '0 min')}
                                    </div>
                                    <div className={styles.cookingTimeLabel}>
                                        Total Time:
                                        <br />{totalHours + Math.floor(totalMinutes / 60)} hr{totalHours + Math.floor(totalMinutes / 60) > 1 ? 's' : ''}
                                        {totalMinutes % 60 !== 0 ? ` ${totalMinutes % 60} min` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.category}> {category} </div>
                        <div className={styles.servings}> Servings: {servings} </div>
                        <div className={styles.date}>Published: {formattedPublishedDate} </div>
                        <div className={styles.actions}>
                            <div onClick={()=> setLoading(true)} >
                                <Button link={`/recipes/${patcheNo}/${id}`} className={styles.viewRecipeButton}>
                                    <span className={styles.viewRecipeButtonText}>View Recipe</span>
                                </Button>
                            </div>
                        </div>
                    </li>

                </div>
            }

        </>
    )
}

export default RecipesFavItems; 