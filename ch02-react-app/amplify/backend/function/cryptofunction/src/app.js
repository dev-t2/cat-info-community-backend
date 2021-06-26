const express = require('express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

// declare a new express app
const app = express();

app.use(express.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.get('/coins', (req, res) => {
  const coins = [
    { name: 'BitCoin', symbol: 'BTC', price: 10000 },
    { name: 'Ethereum', symbol: 'ETH', price: 400 },
    { name: 'LiteCoin', symbol: 'LTC', price: 150 },
  ];

  res.json({ coins });
});

app.listen(3000, () => {
  console.log('App started');
});

module.exports = app;
