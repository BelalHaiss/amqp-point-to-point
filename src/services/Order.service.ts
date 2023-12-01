import { OrderConsumer } from '../amqp/consumer/order-consumer';
import { OrderProducer } from '../amqp/producer/order-producer';
import { Order } from '../model/order/order.entity';
import { OrderRepoistory } from '../repository/order.repository';
import { PaymentService } from './payment.service';

export class OrderService {
  private orderRepoistory = OrderRepoistory;
  private orderPublisher = new OrderProducer();
  private orderConsumer = new OrderConsumer();
  private paymentService = new PaymentService();
  private static isConsuming: boolean = false;

  constructor() {
    if (!OrderService.isConsuming) {
      this.orderConsumer.consumeOrder(this.handleOrderConsuming);
      OrderService.isConsuming = true;
    }
  }

  public async NewOrder(order: Order) {
    await this.orderRepoistory.save(order);

    await this.paymentService.publish(order.payment);
  }

  public async newOrderFromBulk(order: Order) {
    await this.orderPublisher.publishOrder(order);
  }

  private async handleOrderConsuming(order: Order) {
    await this.NewOrder(order);
  }
}
