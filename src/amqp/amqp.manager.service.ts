import amqplib from 'amqplib';
import { AmpqConfig } from '../config/amqp.config';
import { ChannelType, QueueType } from './amqp.types';

export class AmqpManager {
  private connection: amqplib.Connection;
  private ampqConfig = AmpqConfig;
  private payment_channel: amqplib.Channel;
  private order_channel: amqplib.Channel;
  private payment_consumer_channel: amqplib.Channel;
  private order_consumer_channel: amqplib.Channel;
  private async handleConnection() {
    try {
      if (this.connection) return;
      const amqpConnection = await amqplib.connect(this.ampqConfig.url);
      this.connection = amqpConnection;
    } catch (error) {
      console.error(`Error connecting to RabbitMQ: ${error}`);
      console.log('Reconnecting...');
      this.handleConnection();
    }
  }

  private getConfig(queueType: QueueType) {
    const info = {
      exchange: this.ampqConfig['exchange'][queueType],
      queue: this.ampqConfig['queues'][queueType],
      pattern: this.ampqConfig['patterns'][queueType]
    };
    return info;
  }

  public async getChannelWithConfig(channelType: ChannelType) {
    await this.handleConnection();
    const queueType: QueueType = channelType.includes('payment')
      ? 'payment'
      : 'order';

    const { exchange, queue, pattern } = this.getConfig(queueType);
    if (!this[channelType]) {
      const createdChannel = await this.connection.createChannel();
      await createdChannel.assertExchange(exchange, 'direct', {
        durable: true
      });
      await createdChannel.assertQueue(queue, { durable: true });
      await createdChannel.bindQueue(queue, exchange, pattern);
      this[channelType] = createdChannel;
    }
    const channel = this[channelType];
    return {
      channel,
      exchange,
      queue,
      pattern
    };
  }

  private constructor() {}
  public static instance: AmqpManager;
  public static getInstance() {
    return this.instance ?? new AmqpManager();
  }
}
