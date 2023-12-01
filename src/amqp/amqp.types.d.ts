import { Channel } from 'amqplib';

export type ChannelWithConfig = {
  channel: Channel;
  exchange: string;
  queue: string;
  pattern: string;
};

export type QueueType = 'payment' | 'order';

export type ChannelType = 'payment_channel' | 'order_channel';
