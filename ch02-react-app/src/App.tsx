import { memo, useEffect, useState } from 'react';
import { API } from 'aws-amplify';

interface ICoin {
  name: string;
  symbol: string;
  price: number;
}

const App = () => {
  const [coins, setCoins] = useState<ICoin[]>([]);

  const getCoins = async () => {
    const data = await API.get('cryptoapi', '/coins', {});

    setCoins(data.coins);
  };

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <div>
      {coins.map((coin, index) => {
        return (
          <div key={index}>
            <h2>
              {coin.name} - {coin.symbol}
            </h2>

            <h5>${coin.price}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default memo(App);
