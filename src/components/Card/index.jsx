import React, { useState } from "react";
import styles from "./Card.module.scss";

function Card({ title, imageUrl, price, onPlus }) {
  const [isAdded, setIsAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const onClickPlus = () => {
    setIsAdded(!isAdded);
    onPlus({ title, imageUrl, price });
  };

  const onAddToFavorite = () => {
    // setFavorite((prev) => [...prev]);
    setFavorite(!favorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={onAddToFavorite}
          src={favorite ? "/img/liked.svg" : "/img/unliked.svg"}
          alt="Unliked"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
        />
      </div>
    </div>
  );
}

export default Card;
