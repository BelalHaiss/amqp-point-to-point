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
  FAILED = 'failed'
}
@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus
  })
  status: PaymentStatus;

  @OneToOne(() => Order, (order) => order.payment)
  order: Order;
}
