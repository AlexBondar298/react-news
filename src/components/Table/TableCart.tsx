import React, { useState } from "react";

interface DataCart {
  key: number;
  index: number;
  author: string;
  title: string;
  description: string;
  urlToImage: string;
  pinNewsByTitle: () => void;
  editNews: (
    index: number,
    word: string,
    editText: string
  ) => void;
}

const TableCart = ({
  index,
  author,
  title,
  description,
  urlToImage,
  pinNewsByTitle,
  editNews,
}: DataCart) => {
  const [edit, setEdit] = useState<boolean>(false);

  const [editWord, setEditWord] = useState<string>("Edit...");

  const f = (arg: string, editText: string): void => {
    setEdit(!edit);
    editNews(index, editWord, editText);
    setEditWord(arg);
  };

  return (
    <li className="table__cart">
      <div className="table__cart-item">
        <h2 className="table__cart-title" onClick={() => f(title, "title")}>
          {title}
        </h2>
        <img
          src={urlToImage}
          alt="image"
          className="table__cart-img"
          onClick={() => f(urlToImage, "urlToImage")}
        />
        <p
          className="table__cart-description"
          onClick={() => f(description, "description")}
        >
          {" "}
          {description}
        </p>
        <p className="table__cart-author" onClick={() => f(author, "author")}>
          Author: <span>{author}</span>
        </p>
      </div>
      {edit ? (
        <>
          <div className="textarea">
            <textarea
              value={editWord}
              onChange={(event) => setEditWord(event.target.value)}
            />
          </div>
        </>
      ) : null}
      <div className="table__cart-pin">
        <button onClick={pinNewsByTitle}> Pin news </button>
      </div>
    </li>
  );
};

export default TableCart;
