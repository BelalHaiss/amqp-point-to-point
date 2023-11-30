import { AppDataSource } from '../../config/datasource';
import { Order } from './order.entity';

export const orderRepoistory = AppDataSource.getRepository(Order);
