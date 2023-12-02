import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import './config/datasource';
import { OrderRouter } from './controller/order.controller';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(OrderRouter.path, OrderRouter.router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err, 'express error handler');
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
