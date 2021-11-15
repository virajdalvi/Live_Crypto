import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Components/Coin";
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log("error"));
  });
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="liveCrypto">
      <div className="coinSearch">
        <h1 className="searchText">Live Crypto</h1>
        <form>
          <input
            type="text"
            placeholder="Search Your Coin...."
            className="searchInput"
            onChange={handleChange}
          />
        </form>
      </div>
      {filterCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
