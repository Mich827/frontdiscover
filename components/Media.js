import React from "react";
import styles from "../styles/Media.module.css";
import { useState, useEffect } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark } from "../reducers/bookmarks";
import { Popover, Button } from "antd";
export default function Media() {
  const dispatch = useDispatch();

  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?sources=the-verge&apiKey=69b3fe5d7e3c4b44b3228f86b163864d"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //console.log(data.articles[0].author);
        //console.log(data.articles[0].publishedAt);

        setArticlesData(data.articles);
        //console.log(data.results[0].overview);
      });
  }, []);

  // add bookmark to favorite and in the store redux
  const handleBookmarkClick = (article) => {
    dispatch(addBookmark(article));
  };

  return (
    <div>
      <div className={styles.containerMedia}>
        {articlesData.map((article, i) => (
          <div className={styles.card} key={i}>
            <img className={styles.image} src={article.urlToImage} />
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button onClick={() => handleBookmarkClick(article)}>
                <FontAwesomeIcon
                  icon={faBookmark}
                  className={styles.bookmarkIcon}
                />
              </button>
            </div>
            <p className={styles.titleArticle}>{article.title}</p>
            <p className={styles.descriptionArticle}>{article.description}</p>

            <p>
              <a
                className={styles.customLink}
                href={article.url}
                target="blank"
              >
                En savoir plus...
              </a>
            </p>
            <p>
              <strong>{article.author}</strong>
            </p>
            <p>
              Published le:
              {moment(article.publishedAt).format("DD/MM/YYYY")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
