import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewCards from "./components/NewsCards/NewsCards";
import wordsToNumbers from "words-to-numbers";
import useStyles from "./styles.js";

const alanKey =
  "6f389de6010c5793f2bc358a7062641e2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(
    () => {
      alanBtn({
        key: alanKey,
        onCommand: ({ command, articles, number }) => {
          if (command === "newHeadlines") {
            setNewsArticles(articles);
            setActiveArticle(-1);
          } else if (command === "highlight") {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          } else if (command === "open") {
            const parseNumber =
              number.length > 2 ? wordsToNumbers(number) : number;
            const article = articles[parseNumber - 1];

            if (parseNumber > 20) {
              // alanBtn().playText("Please try that again.");
            } else if (article) {
              window.open(articles[number].url, "_blank");
              // alanBtn().playText("Opening...");
            }
          }
        },
      });
    }, // eslint-disable-next-line
    []
  );

  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src="https://miro.medium.com/max/1200/1*CJyCnZVdr-EfgC27MAdFUQ.jpeg"
          className={classes.alanLogo}
          alt="Alan Logo"
        />
      </div>
      <NewCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
