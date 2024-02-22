import React from "react";

interface DataCart {
  author: null | string;
  title: string;
  description: null | string;
  urlToImage: string;
}

const TableCart = ({ author, title, description, urlToImage }: DataCart) => {
  return (
    <li className="table__cart">
      <h2 className="table__cart-title">{title}</h2>
      <img src={urlToImage} alt="image" className="table__cart-img" />
      <p className="table__cart-description">{description}</p>
      <p className="table__cart-author">
        Author: <span>{author}</span>
      </p>
    </li>
  );
};

export default TableCart;
