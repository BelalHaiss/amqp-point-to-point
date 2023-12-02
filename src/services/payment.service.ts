import { PaymentProducer } from '../amqp/producer/payment-producer';
import { PaymentConsumer } from '../amqp/consumer/payment-consumer';
import { OrderStatus } from '../model/order/order.types';
import { PaymentQueue, PaymentStatus } from '../model/payment/payment.types';
import { OrderRepoistory } from '../repository/order.repository';
import { PaymentGatwayService } from './paymentGateway.service';

export class PaymentService {
  private paymentProducer = new PaymentProducer();
  private paymentConsumer = new PaymentConsumer();
  private paymentGateway = new PaymentGatwayService();
  private orderRepoistory = OrderRepoistory;
  private static isConsuming: boolean = false;

  constructor() {
    if (!PaymentService.isConsuming) {
      PaymentService.isConsuming = true;
      this.paymentConsumer.consumePayment(
        this.handlePaymentConsumer.bind(this)
      );
    }
  }

  private async handlePaymentConsumer(payment: PaymentQueue) {
    const paymentStatus = this.paymentGateway.processPayment(payment);
    const orderStatus =
      paymentStatus === PaymentStatus.FAILED
        ? OrderStatus['FAILED']
        : OrderStatus['IN_PROGRESS'];

    await this.orderRepoistory.updateStatusForOrderAndPayment(
      payment.id,
      orderStatus,
      paymentStatus
    );
  }
  public async publish(payment: PaymentQueue): Promise<void> {
    await this.paymentProducer.publishPayment(payment);
  }
}
