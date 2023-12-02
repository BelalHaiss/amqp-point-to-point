import { AppDataSource } from '../config/datasource';
import { Order } from '../model/order/order.entity';
import { PaymentStatus } from '../model/payment/payment.types';

export const OrderRepoistory = AppDataSource.getRepository(Order).extend({
  async updateStatusForOrderAndPayment(
    paymentId: number,
    orderStatus: Order['orderStatus'],
    paymentStatus: PaymentStatus
  ) {
    await this.query(
      `
     UPDATE orders O 
     JOIN payment P ON O.payment_id = P.id  
     SET O.orderStatus= ? , P.status= ? 
     WHERE O.payment_id = ?
    `,
      [orderStatus, paymentStatus, paymentId]
    );
  }
});
