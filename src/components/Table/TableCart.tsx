import React, { useState, useEffect } from "react";

interface DataCart {
  author: string;
  title: string;
  description: string;
  urlToImage: string;
  pinNewsByTitle: () => void;
}

const TableCart = ({ author, title, description, urlToImage, pinNewsByTitle }: DataCart) => {
  const [editAuthor, setAuthor] = useState<string>(author);
  const [editTitle, setTitle] = useState<string>(title);
  const [editDescription, setDescription] = useState<string>(description);
  const [editUrlToImage, setUrlToImage] = useState<string>(urlToImage);

  const [editWord, setEditWord] = useState<string>("Edit...");

  const [edit, setEdit] = useState<boolean>(false);

  const editNews = (elem: any, arg:string): void => {
    setEdit(!edit);
    setEditWord(elem);
    if (arg === "editTitle") setTitle(editWord);
    if (arg === "editDescription") setDescription(editWord);
    if (arg === "editAuthor") setAuthor(editWord);
    if (arg === "editUrlToImage") setUrlToImage(editWord);
  };

  return (
    <li className="table__cart">
      <div className="table__cart-item">
        <h2 className="table__cart-title" onClick={() => editNews(editTitle, "editTitle")}>
          {editTitle}
        </h2>
        <img src={editUrlToImage} alt="image" className="table__cart-img" onClick={() => editNews(editUrlToImage, "editUrlToImage")}/>
        <p className="table__cart-description" onClick={() => editNews(editDescription, "editDescription")}>{editDescription}</p>
        <p className="table__cart-author" onClick={() => editNews(editAuthor, "editAuthor")}>
          Author: <span>{editAuthor}</span>
        </p>
      </div>
      {edit ? (
        <>
          <div>
            <textarea value={editWord} onChange={(event: any) => setEditWord(event.target.value)} />
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
