# RabbitMQ Point-to-Point with Payment and Order Processing

### Prerequisites

This project requires the following:

- MySQL database: Ensure you have a MySQL database named amqp_order set up and accessible.
- RabbitMQ server: Install and configure a RabbitMQ server instance.
- Nodejs

### Install Packages

```bash
npm run install

```

### Run the Project on Dev Mode

```bash
npm run dev

```

By default, the project runs on http://localhost:5000. You can start it using:

1. POST /api/order:

This API endpoint accepts a single order request in JSON format and processes it through the following steps:

Save Order On Database with pending status
Publish payment on payment queue

2. POST /api/order/bulk/[count]:

This API endpoint allows simulating bulk order creation. Specify the desired number of orders in the [count] placeholder. The API will:

Generate [count] promise.all( saving the order).
Publish each order to both the Order Queue and Payment Queue in RabbitMQ for parallel processing.
