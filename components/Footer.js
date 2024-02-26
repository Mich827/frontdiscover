import React from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <a href="#">
        <img width={20} src="/facebook.png" alt="facebook" />
      </a>

      <a href="#">
        <img width={20} src="/twitter.png" alt="facebook" />
      </a>
      <a href="#">
        <img width={20} src="/linkedin.png" alt="facebook" />
      </a>

      <p>Fait le 06.02.2024 à Marseille par Michel Geoffroy</p>
    </div>
  );
}
