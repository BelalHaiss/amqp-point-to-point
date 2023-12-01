import { Payment } from '../../model/payment/payment.entity';
import { AmqpService } from '../amqp.service';

export class PaymentProducer extends AmqpService {
  public async publishPayment(payment: Payment) {
    try {
      const { channel, pattern, exchange } = await super.getChannelWithConfig(
        'payment_channel'
      );

      await channel.publish(
        exchange,
        pattern,
        Buffer.from(JSON.stringify(payment))
      );
    } catch (error) {
      console.log(' Error Publishing Payment:  ', error);
    }
  }
}
