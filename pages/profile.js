import React, { useState } from "react";

import Media from "../components/Media";
import Movies from "../components/Movies";
import Weather from "../components/Weather";
import Favoris from "../components/Favoris";
import styles from "../styles/Home.module.css";

export default function ProfilePage() {
  const [activeComponent, setActiveComponent] = useState("Media");

  return (
    <div>
      <nav className={styles.navbar}>
        <button
          className={
            activeComponent === "Media"
              ? `${styles.btn} ${styles.activeBtn}`
              : styles.btn
          }
          onClick={() => setActiveComponent("Media")}
        >
          News
        </button>
        <button
          className={
            activeComponent === "Movies"
              ? `${styles.btn} ${styles.activeBtn}`
              : styles.btn
          }
          onClick={() => setActiveComponent("Movies")}
        >
          Movies
        </button>
        <button
          className={
            activeComponent === "Weather"
              ? `${styles.btn} ${styles.activeBtn}`
              : styles.btn
          }
          onClick={() => setActiveComponent("Weather")}
        >
          Meteo
        </button>
        <button
          className={
            activeComponent === "Favoris"
              ? `${styles.btn} ${styles.activeBtn}`
              : styles.btn
          }
          onClick={() => setActiveComponent("Favoris")}
        >
          Favoris
        </button>
      </nav>
      <div className={styles.containerMedia}>
        {activeComponent === "Media" && <Media />}
        {activeComponent === "Movies" && <Movies />}
        {activeComponent === "Weather" && <Weather />}
        {activeComponent === "Favoris" && <Favoris />}
      </div>
    </div>
  );
}
