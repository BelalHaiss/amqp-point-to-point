import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Order } from '../order/order.entity';

export enum PaymentStatus {
  APPROVED = 'approved',
  FAILED = 'failed',
  PEDNING = 'pending'
}
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
