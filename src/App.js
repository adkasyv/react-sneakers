import React from "react";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  // fetch("https://6399497dfe03352a94eb04c2.mockapi.io/items");

  React.useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          "https://6399497dfe03352a94eb04c2.mockapi.io/items"
        );
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  const onAddToCart = (obj) => {
    // if (cartItems.find((i) => i !== obj) != alert("error")) return;
    // if (cartItems.indexOf(obj !== cartItems(obj))) return;
    // if((arr.find(item => item.id == {нужный id}) && true) || false) return
    setCartItems((prev) => [...prev, obj]);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <Card
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
