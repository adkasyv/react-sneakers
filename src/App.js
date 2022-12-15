import React from "react";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
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

  // const onDeleteToCart = (obj) => {
  //   setCartItems((prev) => [...])
  // }

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} />
      )}
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
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
