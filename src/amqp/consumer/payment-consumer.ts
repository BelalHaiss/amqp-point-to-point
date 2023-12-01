import { Payment } from '../../model/payment/payment.entity';
import { AmqpService } from '../amqp.service';

export class PaymentConsumer extends AmqpService {
  public async consumePayment(cb: (payment: Payment) => Promise<void>) {
    try {
      const { channel, queue } = await super.getChannelWithConfig(
        'payment_channel'
      );

      await channel.consume(queue, async (message) => {
        const payment: Payment = JSON.parse(message!.content.toString());

        await cb(payment);

        channel.ack(message!);
      });
    } catch (error) {
      console.log(' Error Consuming Payment:  ', error);
    }
  }
}
