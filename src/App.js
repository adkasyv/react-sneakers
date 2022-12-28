import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const cart = await axios.get(
          "https://6399497dfe03352a94eb04c2.mockapi.io/cart"
        );
        const favorites = await axios.get(
          "https://6399497dfe03352a94eb04c2.mockapi.io/favorites"
        );
        const itemsResponse = await axios.get(
          "https://6399497dfe03352a94eb04c2.mockapi.io/items"
        );
        setIsLoading(false);
        setCartItems(cart.data);
        setFavorites(favorites.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    console.log(obj.id);
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        await axios.delete(
          `https://6399497dfe03352a94eb04c2.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        await axios.post(
          "https://6399497dfe03352a94eb04c2.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Товар уже был добавлен в корзину");
    }
  };
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
    console.log(event.target.value);
  };
  const onRemoveItem = async (id) => {
    try {
      console.log(id);
      await axios.delete(
        `https://6399497dfe03352a94eb04c2.mockapi.io/cart/${id}`
      );
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://6399497dfe03352a94eb04c2.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
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
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };
  const isItemAddedFavorite = (id) => {
    return favorites.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        isItemAddedFavorite,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
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
          <Route path="*">error</Route>
          <Route
            path="/"
            exact
            element={
              <Home
                // isItemAdded={isItemAdded}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          ></Route>
          <Route path="/favorites" exact element={<Favorites />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
