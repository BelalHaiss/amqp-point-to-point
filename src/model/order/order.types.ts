import { Item } from '../item/item.entity';
import { Payment } from '../payment/payment.entity';
import { Order } from './order.entity';

export enum OrderStatus {
  PAYMENT_PENDING = 'payment_pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELD = 'canceld'
}

export class OrderDTO implements Omit<Order, 'id'> {
  orderStatus: OrderStatus;
  items: Item[];
  payment: Payment;
}
