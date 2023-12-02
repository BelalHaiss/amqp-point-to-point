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
      this.paymentConsumer.consumePayment(
        this.handlePaymentConsumer.bind(this)
      );
      PaymentService.isConsuming = true;
    }
  }

  private async handlePaymentConsumer(payment: PaymentQueue) {
    const paymentStatus = this.paymentGateway.processPayment(payment);

    paymentStatus;
    const orderStatus =
      paymentStatus === PaymentStatus.FAILED
        ? OrderStatus['FAILED']
        : OrderStatus['IN_PROGRESS'];

    const order = await this.orderRepoistory.findOneOrFail({
      where: {
        id: payment.orderId
      },
      relations: {
        payment: true
      }
    });
    order.payment.status = paymentStatus;
    order.orderStatus = orderStatus;
    await this.orderRepoistory.save(order);
  }
  public async publish(payment: PaymentQueue): Promise<void> {
    await this.paymentProducer.publishPayment(payment);
  }
}
