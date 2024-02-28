import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faEraser,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Media.module.css";
import { removeBookmark } from "../reducers/bookmarks";
const Favoris = () => {
  //const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const handleRemoveMedia = (bookmark) => {
    dispatch(removeBookmark(bookmark));
  };
  /*const handleRemoveBookmark = (index) => {
    const updatedBookmarks = "";
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    dispatch(removeBookmark(index));
    //window.location.reload(); // actualiser la page pour refléter les modifications
  };*/
  return (
    <div>
      <div className={styles.containerMedia}>
        {bookmarks.map((bookmark, i) => (
          <div className={styles.card} key={i}>
            <img className={styles.image} src={bookmark.urlToImage} />
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button onClick={() => handleRemoveMedia(bookmark)}>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{
                    color: "rgb(33, 132, 99)",
                    fontSize: "20px",
                  }}
                />
              </button>
            </div>
            <p>{bookmark.title}</p>
            <p className={styles.titleArticle}>{bookmark.title}</p>
            <p className={styles.descriptionArticle}>{bookmark.description}</p>

            <p>
              <a
                className={styles.customLink}
                href={bookmark.url}
                target="blank"
              >
                En savoir plus...
              </a>
            </p>
            <p>
              <strong>{bookmark.author}</strong>
            </p>
            <p>
              Published le:
              {moment(bookmark.publishedAt).format("DD/MM/YYYY")}
            </p>
          </div>
        ))}
        {/*bookmarks.map((bookmark, index) => (
          <div className={styles.card} key={index}>
            <img className={styles.image} src={bookmark.urlToImage} />
            <p className={styles.titleArticle}>{bookmark.title}</p>
            <p className={styles.descriptionArticle}>{bookmark.description}</p>

            <p>
              <a href={bookmark.url} target="blank">
                En savoir plus...
              </a>
            </p>
            <p>
              <strong>{bookmark.author}</strong>
            </p>
            <p>
              Published le:
              {moment(bookmark.publishedAt).format("DD/MM/YYYY")}
            </p>
            <button onClick={() => handleRemoveBookmark(index)}>
              Supprimer
            </button>
          </div>
        ))*/}
      </div>
    </div>
  );
};

export default Favoris;
