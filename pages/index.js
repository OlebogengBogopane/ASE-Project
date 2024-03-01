import Link from "next/link";
import Image from "next/image";
import styles from "../pages/index.module.css"
import { useState} from "react";
import LoadingState from "@/components/Loading/loading-state";

//Landing Page
function Home(props) {
  const [loading, setLoading] = useState(false)
  


  return (
    <div>
       {loading && <LoadingState />}
      <div className={styles.view}>

        <Image src="/images/WhiteLogo.png" alt="logo" width={300} height={80} />

        <Link href={`/recipes/1`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '30px' }}>
          <button className={styles.buttonStyles} onClick={() => setLoading(true)}>All Recipe</button>
        </Link>
     
        {/* Login and Sign Up buttons with links */}
        <Link href="/login" style={{ textDecoration: 'none' }}>
          <button className={styles.buttonStyles}>Login</button>
        </Link>
        <Link href="/signup" style={{ textDecoration: 'none' }}>
          <button className={styles.buttonStyles}>Sign Up</button>
        </Link>
       
      </div>
      <div className={styles.background}>

      </div>
    </div>
  );

}

export default Home;