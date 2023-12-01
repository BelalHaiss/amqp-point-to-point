import { Repository } from 'typeorm';
import { Payment } from '../model/payment/payment.entity';
import { PaymentRepoistory } from '../repository/payment.repository';
import { PaymentProducer } from '../amqp/producer/payment-producer';
import { PaymentConsumer } from '../amqp/consumer/payment-consumer';
import { PaymentGatwayService } from './paymentGateway.service';
import { OrderStatus } from '../model/order/order.types';
import { PaymentStatus } from '../model/payment/payment.types';
import { OrderRepoistory } from '../repository/order.repository';

export class PaymentService {
  private paymentRepoistory: Repository<Payment> = PaymentRepoistory;
  private paymentProducer = new PaymentProducer();
  private paymentConsumer = new PaymentConsumer();
  private paymentGateway = new PaymentGatwayService();
  private orderRepoistory = OrderRepoistory;
  private static isConsuming: boolean = false;

  constructor() {
    if (!PaymentService.isConsuming) {
      this.paymentConsumer.consumePayment(this.handlePaymentConsumer);
      PaymentService.isConsuming = true;
    }
  }

  private async handlePaymentConsumer(payment: Payment) {
    const paymentStatus = this.paymentGateway.processPayment(payment);
    const { order } = payment;
    payment['status'] = paymentStatus;
    order['orderStatus'] =
      paymentStatus === PaymentStatus.FAILED
        ? OrderStatus['FAILED']
        : OrderStatus['IN_PROGRESS'];

    await this.orderRepoistory.save(order);
  }
  public async publish(payment: Payment): Promise<void> {
    await this.paymentProducer.publishPayment(payment);
  }
}
