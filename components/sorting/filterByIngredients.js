import styles from "@/components/sorting/searchBar.module.css"

/**
 * 
 * @param {function} setIngredients is state function that enables recipes to filtered by ingredients
 * @param {Object} ingredients is a property object within recipe array.
 * @returns selection element to filter recipes by selected ingredient
 */



function FilterByIngrediets({ setIngredients, ingredients }) {

    function handleIngredients(event) {
        setIngredients((prev) => [...prev, event.target.value])
    }

    function handleDeleteIngredients(event) {
        setIngredients(ingredients.filter((ingredient) => ingredient != event.target.value))
    }

    return (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            paddingBottom: '20px', 
            color: 'black',

            }}>
            <label style={{ padding: '17px' }}>Filter By ingredients: </label>
                    <select className={styles.dropdown2} value={ingredients[ingredients.length - 1]} onChange={handleIngredients}>
                    <option value={''}>Choose...</option>
                    <option value={'onion'}>onion</option>
                    <option value={'garlic'}>garlic</option>
                    <option value={'potatoes'}>potatoes</option>
                    <option value={'butter'}>butter</option>
                    <option value={'milk'}>milk</option>
                    <option value={'egg'}>egg</option>
                    <option value={'mushrooms'}>mushrooms</option>
                    <option value={'salt'}>salt</option>
                    <option value={'ricotta cheese'}>ricotta cheese</option>
            </select>
            

            {ingredients.map((ingredient, index) => {
                return (<button key={index} onClick={handleDeleteIngredients} value={ingredient}>{ingredient}</button>)
            })}
        </div>
    )
}

export default FilterByIngrediets;