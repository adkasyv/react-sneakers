import React, { useState, useEffect } from "react";
import axios from "axios";
// import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";

import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          "https://6399497dfe03352a94eb04c2.mockapi.io/items"
        );
        const cart = await axios.get(
          "https://6399497dfe03352a94eb04c2.mockapi.io/cart"
        );
        const favorites = await axios.get(
          "https://6399497dfe03352a94eb04c2.mockapi.io/favorites"
        );
        setItems(response.data);
        setCartItems(cart.data);
        setFavorites(favorites.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((obj) => obj === obj)) {
        axios.delete(
          `"https://6399497dfe03352a94eb04c2.mockapi.io/cart/${obj.id}`
        );
        alert("Товар был удален из корзины");
      } else {
        const { data } = await axios.post(
          "https://6399497dfe03352a94eb04c2.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в корзину");
    }
  };
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
    console.log(event.target.value);
  };
  const onRemoveItem = (id) => {
    // axios.delete(`https://60d381a361160900173c93d3.mockapi.io/cart/${id)`);
    try {
      axios.delete(`https://6399497dfe03352a94eb04c2.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://6399497dfe03352a94eb04c2.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
        alert("Товар был удален из закладок");
      } else {
        const { data } = await axios.post(
          "https://6399497dfe03352a94eb04c2.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        {/* <Route path="/test" exact element={<Header />}></Route> */}
        <Route path="*">error</Route>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        ></Route>

        <Route
          path="/favorites"
          exact
          element={
            <Favorites
              favorites={favorites}
              onAddToFavorite={onAddToFavorite}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
