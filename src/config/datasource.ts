import { DataSource } from 'typeorm';
import { Item } from '../model/item/item.entity';
import { Order } from '../model/order/order.entity';
import { Payment } from '../model/payment/payment.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  username: 'root',
  password: 'password',
  database: 'amqp_order',
  host: 'localhost',
  port: 3306,
  entities: [Item, Order, Payment],
  synchronize: true
});

AppDataSource.initialize()
  .then(() => console.log('db connected'))
  .catch((e) => console.log('db connection failed' + e));
