import styles from "./searchBar.module.css"

//import styles from "@/components/sorting/searchBar.module.css"
function FilterBySteps({ setNumSteps, numSteps }) {


    function handleSteps(event) {
        setNumSteps(event.target.value)
    }

    return (
        <div className={styles.recipefilters}>
            <label htmlFor="numSteps" style={{ padding: '37px',  }}>Filter By Steps: </label>
                <input className={styles.fillSteps} type="number" id="numSteps" value={numSteps} onChange={handleSteps}></input>
        </div>
    )
}

export default FilterBySteps;