import { AppDataSource } from '../config/datasource';
import { Order } from '../model/order/order.entity';

export const OrderRepoistory = AppDataSource.getRepository(Order);
