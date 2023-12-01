import { Order } from '../../model/order/order.entity';
import { AmqpService } from '../amqp.service';

export class OrderConsumer extends AmqpService {
  public async consumeOrder(cb: (order: Order) => Promise<void>) {
    try {
      const { channel, queue } = await super.getChannelWithConfig(
        'order_channel'
      );

      await channel.consume(queue, async (message) => {
        const order: Order = JSON.parse(message!.content.toString());

        await cb(order);

        channel.ack(message!);
      });
    } catch (error) {
      console.log(' Error Consuming Order:  ', error);
    }
  }
}

const orderConsumer = new OrderConsumer();

export const { consumeOrder } = orderConsumer;
