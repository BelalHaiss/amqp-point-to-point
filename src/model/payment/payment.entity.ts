import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Order } from '../order/order.entity';
import { PaymentStatus } from './payment.types';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PEDNING
  })
  status: PaymentStatus;

  @OneToOne(() => Order, (order) => order.payment)
  order: Order;
}
