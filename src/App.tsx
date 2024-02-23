import React, { useEffect, useState } from "react";
import "./scss/index.scss";
import axios from "axios";
import TableCart from "./components/Table/TableCart";

interface DataNews {
  author: string;
  title: string;
  description: string;
  url?: string;
  urlToImage: string;
  publishedAt?: string;
  content?: string;
}

function App() {
  const [dataNews, setDataNews] = useState<DataNews[]>([]);
  const [nonRepeatingArticles, setNonRepeatingArticles] = useState<DataNews[]>([]); //*удаление дубликатов статей

  const [lengthArticles, setLengthArticles] = useState<number>(10);

  const [searchNews, setSearchNews] = useState<string>("");
  const [searchItem, setSearchItem] = useState<keyof DataNews>("title");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPinNews, setIsPinNews] = useState<boolean>(true);

  /************************************************************** */
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const dataResponse: any = await axios.get("https://newsapi.org/v2/everything?q=tesla&from=2024-01-23&sortBy=publishedAt&apiKey=685ecc34aee24e8da83f408a24c9b783");
        setDataNews(dataResponse.data.articles);
        setIsLoading(false);
      } catch (error) {
        alert("ошибка при запросе данных");
      }
    }

    fetchData();
  }, []);

  //************************************************************* */
  const myNews: DataNews[] = [
    {
      author: "author",
      title: "title",
      description: "description",
      urlToImage: "https://www.hibridosyelectricos.com/uploads/s1/63/37/18/tesla-semi-pepsi-2_17_2000x1126.jpeg",
    },
  ];

  const addMyNews = (lengthArticles: number): void => {
    setNonRepeatingArticles((prev) => [...prev.slice(0, lengthArticles), myNews[0], ...prev.slice(lengthArticles)]);
    setLengthArticles((prev) => prev + 1);
  };

  //************************************************************* */

  //*********************************************************** */
  for (let i of dataNews) {
    if (!nonRepeatingArticles.find((article) => article.title === i.title)) {
      if (i.title !== "[Removed]") nonRepeatingArticles.push(i);
    }
  }

  const pinNewsByTitle = (title: string): void => {
    const pinNewsArr: DataNews[] = nonRepeatingArticles.filter((elem) => elem.title === title);
    if (isPinNews) {
      const otherNewsArr: DataNews[] = nonRepeatingArticles.filter((elem) => elem.title !== title);
      setDataNews([...pinNewsArr, ...otherNewsArr]);
      setIsPinNews(!isPinNews);
    } else {
      pinNewsArr[0].title === dataNews[0].title && setIsPinNews(!isPinNews);
    }
  };
  console.log(nonRepeatingArticles);

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
                  <div className="table__search">
                    <input type="text" value={searchNews} onChange={(event) => setSearchNews(event.target.value)} placeholder="search" />
                    <input type="radio" name="searcNewsUser" value="title" checked={searchItem === "title" ? true : false} onChange={(event: any) => setSearchItem(event.target.value)} /> {"title"}
                    <input type="radio" name="searcNewsUser" value="description" checked={searchItem === "description" ? true : false} onChange={(event: any) => setSearchItem(event.target.value)} />
                    {"description"}
                  </div>
                  <ul className="table__list">
                    {nonRepeatingArticles
                      .slice(0, lengthArticles)
                      .filter((elem) => elem[searchItem]?.toLocaleLowerCase().includes(searchNews.toLocaleLowerCase()))
                      .map((elem, index) => (
                        <TableCart key={index} author={elem.author} title={elem.title} description={elem.description} urlToImage={elem.urlToImage} pinNewsByTitle={() => pinNewsByTitle(elem.title)} />
                      ))}
                  </ul>
                  <div className="table__addNews">
                    <button onClick={() => addMyNews(lengthArticles)}> Add my News </button>
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
