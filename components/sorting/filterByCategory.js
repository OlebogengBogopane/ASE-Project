import styles from "./searchBar.module.css"

import { useState } from "react";


/**
 * 
 * @param {String} categories recipes property from recipes collection.
 * @param {Function} setCategory is state function it eanbles categories to be filtered.
 * @returns selection element to be filtered by category.
 */

function FilterByCategory({ categories, setCategory, category }) {
    const [chosenValue, setChosenValue] = useState(category)

    function handleCategory(event) {
        setCategory(event.target.value)
        setChosenValue(event.target.value)
    }

    return (
        <div className={styles.recipefilters}>
            <label style={{ padding: '25px', color: 'black' }}>Filter By Category: </label>
            
                <select className={styles.dropdown} value={chosenValue} onChange={handleCategory} >
                    <option value={''}>Choose...</option>
                    {categories[0].map((category, index) => {
                        return <option key={index} value={category}>{category}</option>
                    })
                    }
                </select>

        </div>
    )
}

export default FilterByCategory;