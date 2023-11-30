export const AmpqConfig = {
  url: 'amqp://localhost',
  queues: {
    order: 'order_queue',
    payment: 'payment_queue'
  },
  exchange: {
    order: 'order_exchange',
    payment: 'payment_exchange'
  },
  patterns: {
    order: 'order',
    payment: 'payment'
  }
};
