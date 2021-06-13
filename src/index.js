const express = require('express');
const app = express();
const productsRouter = require('./products.route');

app.use(express.json());

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  });

  app.use('/products', productsRouter);
  
  app.listen(4000, () =>
    console.log('App is running on http://localhost:4000')
  );