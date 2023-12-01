import { Order } from '../../model/order/order.entity';
import { AmqpService } from '../amqp.service';

export class OrderProducer extends AmqpService {
  public async publishOrder(order: Order) {
    try {
      const { channel, pattern, exchange } = await super.getChannelWithConfig(
        'order_channel'
      );

      await channel.publish(
        exchange,
        pattern,
        Buffer.from(JSON.stringify(order))
      );
    } catch (error) {
      console.log(' Error Publishing Order:  ', error);
    }
  }
}

const orderProducer = new OrderProducer();
export const { publishOrder } = orderProducer;
