import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/components/sorting/searchBar.module.css"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as searchIcon } from "@fortawesome/free-solid-svg-icons";
import FilterByTag from "./filterByTag";
import FilterByIngrediets from "./filterByIngredients";
import FilterByCategory from "./filterByCategory";
import FilterBySteps from "./filterBySteps";
import { Input } from "postcss";

/**
 * 
 * @param {String} categories is a property of recipe object.
 * @param {Number} pageNo controls number of frecipes to be previewed.
 * @param {String} searchChar tracks number of charcters enterd on a search bar for input query.
 * @param {Function} setIsSorting is state function that enables sorting of any selcted
 *  recipe's properties.
 * @param {InputEvent} isSorting that triggers the sorting event of a selected component.
 * @param {String} history stores and displays characters entered on the previous search.
 * @returns 
 */

function SearchBar({ categories, pageNo, searchChar, setIsSorting, isSorting, history, filterByTags, filterByIngredients, categoryfilter, filterBySteps }) {
  const [query, setQuery] = useState();
  const [backUpQuery, setBackUpQuery] = useState(searchChar)
  const [searchHistory, setSearchHistory] = useState(query ? query : backUpQuery);
  const [selectedValue, setSelectedValue] = useState('');
  const [tags, setTags] = useState(filterByTags)
  const [ingredients, setIngredients] = useState(filterByIngredients)
  const [category, setCategory] = useState(categoryfilter)
  const [filterToggle, setFilterToggle] = useState(false)
  const [numSteps, setNumSteps] = useState(filterBySteps)

  const [areFiltersSelected,setAreFiltersSelected] = useState(false)
  const [showSubmitButton, setShowSubmitButton] = useState(false)
  const [showDeleteHistory, setShowDeleteHistory] = useState(history);;


  const router = useRouter();
  const { asPath } = router
  const delay = 5000;

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    // Update the state when filters change
    setAreFiltersSelected(tags.length > 0 || ingredients.length > 0 || category !== '' || numSteps > 0);
  }, [tags, ingredients, category, numSteps]);

  async function addToHistory(searchWord) {
    const response = await fetch('/api/history', {
        method: 'POST',
        body: JSON.stringify(searchWord),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
  }

  async function deleteHistory() {
    const response = await fetch('/api/history', {
      method: 'DELETE',
      body: JSON.stringify(''),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Recipe failed to delete');
    } else {
      setShowDeleteHistory([])
    }
  }

  useEffect(() => {
    if (query && query.length < 10) {
      setShowSubmitButton(true);

      const navigateToNewPage = () => {
        router.push(`/recipes/1/?search=${query ? query : backUpQuery}`);
        !history.includes(query ? query : backUpQuery) && addToHistory(query ? {_id: query, searchWord: query } : {_id: backUpQuery, searchWord: backUpQuery })
      };

      const timeoutId = setTimeout(navigateToNewPage, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [router, query, delay]);

  const handleClearFilters = () => {
    if (
      (!backUpQuery || backUpQuery.trim().length === 0) &&
      tags.length === 0 &&
      category.length === 0 &&
      ingredients.length === 0 &&
      numSteps.length === 0
    ) {
      alert("No filters selected");
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className={styles.filters}>
        <div className={styles.searchBar}>

            <FontAwesomeIcon icon={searchIcon} size="lg" color="black" style={{ paddingRight: '10px', paddingTop: '30px' }} />
            <input className={styles.input} onClick={() => setFilterToggle(!filterToggle)} type="text" placeholder="Enter text ..." value={query} onChange={handleInputChange} />
            { showDeleteHistory.length > 0 && 

            <select className={styles.selectorSearch} value={selectedValue} onChange={(e)=> {
              setSelectedValue(e.target.value)
              setQuery(e.target.value)
              }}>
              {history.map((data, index) => {
                return <option key={index} value={data}>{data}</option>
              })}
            </select>}

            {(query && query.length >= 10) &&
              <Link href={`/recipes/1/?search=${query ? query : backUpQuery}`}>
                <button className={styles.submitButton}>Submit </button>
              </Link>
            }


        </div>

        <div className={styles.deleteButton}>
          {showDeleteHistory.length > 0 && <button onClick={deleteHistory} className={styles.deleteHistoryBtn}> Delete History </button>}
        </div>

        <div className={styles.filtersDiv}>
          <FilterBySteps setNumSteps={setNumSteps} numSteps={numSteps} />
          <FilterByTag setTags={setTags} tags={tags} />
          <FilterByCategory categories={categories} category={category} setCategory={setCategory} />
          <FilterByIngrediets setIngredients={setIngredients} ingredients={ingredients} />
        </div>

        <div style={{
          display: 'flex',
          width: 'fit-content',
          textAlign: 'center',
          marginTop: '20px',
          border: 'none',
        }}>
          {areFiltersSelected ? (
            <>
              <Link href={`/recipes/1/?${backUpQuery ? `search=${query ? query : backUpQuery}&` : ''}tags=${tags}&categories=${category}&ingredients=${ingredients}&steps=${numSteps}`}>
                <button className={styles.filterBtn}>filter</button>
              </Link>
              
              <Link href={`/recipes/1${asPath.includes('?search=') ? `/?search=${backUpQuery}` : ''}`}>
                <button className={styles.filterBtn}>Clear All Filters</button>
              </Link>
          </>
          ) : (
            
            <p className= {styles.nofilter}>No filters have been selected!</p>
            
            )}
          <button onClick={() => setIsSorting(!isSorting)} className={styles.filterBtn}>Close</button>
        </div>

      </div>
    </div>




  );
}

export default SearchBar;
