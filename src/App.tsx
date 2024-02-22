import React, { useEffect, useState } from "react";
import "./scss/index.scss";
import axios from "axios";
import TableCart from "./components/Table/TableCart";

interface DataNews {
  author: null | string;
  title: string;
  description: null | string;
  url?: string;
  urlToImage: string;
  publishedAt?: string;
  content?: string;
}

function App() {
  const [dataNews, setDataNews] = useState<DataNews[]>([]);
  const [lengthArticles, setLengthArticles] = useState<number>(10);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  /************************************************************** */
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const dataResponse: any = await axios.get("https://newsapi.org/v2/everything?q=tesla&from=2024-01-22&sortBy=publishedAt&apiKey=685ecc34aee24e8da83f408a24c9b783");
        setDataNews(dataResponse.data.articles);
        setIsLoading(false);
      } catch (error) {
        alert("ошибка при запросе данных");
      }
    }

    fetchData();
  }, []);

  //*********************************************************** */
  const nonRepeatingArticles: DataNews[] = [];
  for (let i of dataNews) {
    if (!nonRepeatingArticles.find((article) => article.title === i.title)) {
      nonRepeatingArticles.push(i);
    }
  }
  //************************************************************* */
  return (
    <div className="body">
      <header className="header">
        <div className="content"></div>
      </header>
      <main className="main">
        <section className="table">
          <div className="container">
            <div className="table__inner">
              {isLoading ? (
                <div className="title"> Loading ...</div>
              ) : (
                <>
                  <h1 className="table-title title">All articles about Tesla from the last month</h1>
                  <ul className="table__list">
                    {nonRepeatingArticles.slice(0, lengthArticles).map((elem, index) => (
                      <TableCart key={index} author={elem.author} title={elem.title} description={elem.description} urlToImage={elem.urlToImage} />
                    ))}
                  </ul>
                  <div className="addNews">
                    <button onClick={() => setLengthArticles((prev) => prev + 10)}> Add news</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
