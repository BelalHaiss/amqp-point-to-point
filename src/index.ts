import express, { Request, Response } from 'express';
import 'dotenv/config';
import './config/datasource';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //

app.post('/order', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
