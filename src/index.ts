import express, { NextFunction, Response, Request } from 'express';
const app = express();
import { router as productsRouter } from './products.route';

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
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