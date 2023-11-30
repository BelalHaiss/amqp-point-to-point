import { AppDataSource } from '../config/datasource';
import { Payment } from '../model/payment/payment.entity';

export const paymentRepoistory = AppDataSource.getRepository(Payment);
