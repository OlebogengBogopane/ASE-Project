
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css"; // Import the CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as searchIcon } from "@fortawesome/free-solid-svg-icons";
import style from '@/components/sorting/searchBar.module.css'
import SearchBar from "../sorting/auto-submission";
import { useRouter } from "next/router";
import LoadingState from "../Loading/loading-state";

/**
 * Component for updating and displaying recipe descriptions.
 * @param {Object} props - Properties passed to the component.
 * @param {string} props.description - The current recipe description.
 * @param {string} props.recipeId - The ID of the recipe associated with the description.
 * @returns {JSX.Element} - Rendered React component.
 */


const Navbar = ({ categories, pageNo, searchChar, setIsSorting, isSorting, history, filterByTags, filterByIngredients, categoryfilter, filterBySteps }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter().asPath;

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {isLoading && <LoadingState />}
      {isSorting &&
        <div className={style.sortSection} >
          <SearchBar categories={categories} pageNo={pageNo} searchChar={searchChar} setIsSorting={setIsSorting} isSorting={isSorting} history={history} filterByTags={filterByTags} filterByIngredients={filterByIngredients} categoryfilter={categoryfilter} filterBySteps={filterBySteps} />
        </div>}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/recipes/1">
            <img src="/images/WhiteLogo.png" alt="logo" className={styles.logo} />
          </Link>
        </div>

        <button className={`${styles.menuButton} ${isMenuOpen ? styles.open : ""}`} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </button>

        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}>
          <div className={styles.hamburger} onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          {router.includes(`/recipes/${pageNo}`) && <>
            <div onClick={() => setIsSorting(!isSorting)} style={{ paddingTop: '9px' }}>
              <input className={style.input} size={20} placeholder={"Search ..."} readOnly   onClick={toggleMenu}/>
              <FontAwesomeIcon icon={searchIcon} size="lg" color="black" style={{ paddingLeft: '10px', paddingTop: '18px' }} />
            </div>
          </>}

          <li>
            <Link href="/">
              <h2 className={styles.link}>Home</h2>
            </Link>
          </li>
          
          <li>
            <Link href={'/favourites/1'}>
              <h2 className={styles.link} onClick={() => setIsLoading(true)}>{"Favourites"}</h2>
            </Link>
          </li>
          <li>
            <Link href="/recipes/1">
              <h2 className={styles.link} onClick={() => setIsLoading(true)}>
                All Recipes
              </h2>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
