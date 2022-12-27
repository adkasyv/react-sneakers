import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import AppContext from "./context";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const color = "#000000";
  // const [userColor, setUserColor] = useState({
  //   color: "red",
  // });

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
        alert("Товар был удален из корзины");
      } else {
        await axios.post(
          "https://6399497dfe03352a94eb04c2.mockapi.io/cart",
          obj
        );
        // setCartItems((prev) => [...prev, data]);
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
  const onRemoveItem = (id) => {
    try {
      console.log(id);
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
  // const isItemAdded = async (id) => {
  //   return cartItems.some((obj) => Number(obj.id) === Number(id));
  // };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
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
          {/* <Route path="/test" exact element={<Header />}></Route> */}
          <Route path="*">error</Route>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                isItemAdded={isItemAdded}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          ></Route>
          <Route
            path="/favorites"
            exact
            element={<Favorites onAddToFavorite={onAddToFavorite} />}
          ></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
