import { AppDataSource } from '../config/datasource';
import { Payment } from '../model/payment/payment.entity';

export const PaymentRepoistory = AppDataSource.getRepository(Payment);
