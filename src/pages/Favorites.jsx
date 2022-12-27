import React, { useContext } from "react";
import Card from "../components/Card";
import AppContext from "../context";

// const state = useContext(AppContext);
// console.log(state);
const { favorites, onAddToFavorite } = useContext(AppContext);
console.log(favorites);

function Favorites() {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {[].map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;

// const { favorites, onAddToFavorite } = React.useContext(AppContext);
