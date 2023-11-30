import { AppDataSource } from '../config/datasource';
import { Order } from '../model/order/order.entity';

export const orderRepoistory = AppDataSource.getRepository(Order);
