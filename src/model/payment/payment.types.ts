import { Order } from '../order/order.entity';
import { Payment } from './payment.entity';

export enum PaymentStatus {
  APPROVED = 'approved',
  FAILED = 'failed',
  PEDNING = 'pending'
}

export class PaymentQueue implements Omit<Payment, 'order'> {
  id: number;
  status: PaymentStatus;
  orderId: number;
}
