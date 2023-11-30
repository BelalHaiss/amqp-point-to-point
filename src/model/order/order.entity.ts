import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { OrderStatus } from './order.types';
import { Payment } from '../payment/payment.entity';
import { Item } from '../item/item.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus
  })
  orderStatus: OrderStatus;

  @ManyToMany(() => Item, { cascade: true })
  @JoinTable({
    name: 'order_items', // table name for the junction table of this relation
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'item_id',
      referencedColumnName: 'id'
    }
  })
  items: Item[];

  @OneToOne(() => Payment, (payment) => payment.order, { cascade: true })
  @JoinColumn({
    name: 'payment_id',
    foreignKeyConstraintName: 'fk_payment_id'
  })
  payment: Payment;
}
