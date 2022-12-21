import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

import { Route, Routes } from "react-router-dom";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [onFavorite, setOnFavorite] = useState(false); //all favorite

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          "https://6399497dfe03352a94eb04c2.mockapi.io/items"
        );
        const cart = await axios.get(
          "https://6399497dfe03352a94eb04c2.mockapi.io/cart"
        );
        setItems(response.data);
        setCartItems(cart.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  const onAddToCart = (obj) => {
    // if (cartItems.find((i) => i !== obj)) return;
    // if (cartItems.indexOf(obj !== cartItems(obj))) return;
    // if((arr.find(item => item.id == {нужный id}) && true) || false) return
    // if (cartItems.includes(obj)) return 111;
    // if (cartItems.indexOf(obj)) return console.log(11);
    // if (cartItems.some((d) => d.name === obj)) {console.log(11);}

    try {
      axios.post("https://6399497dfe03352a94eb04c2.mockapi.io/cart", obj);
    } catch (error) {
      console.error(error);
    }
    setCartItems((prev) => [...prev, obj]);
  };

  const onChangeSearchValue = (event) => {
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

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Routes>
        <Route path="/test">Hello</Route>
      </Routes>
      1231231
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input
              onChange={onChangeSearchValue}
              value={searchValue}
              placeholder="Поиск..."
            />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                src="/img/btn-remove.svg"
                alt="Search"
              />
            )}
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onPlus={(obj) => onAddToCart(obj)}
                // onAddToFavorite={onAddToFavorite}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
