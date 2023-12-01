import { Payment } from '../model/payment/payment.entity';
import { PaymentStatus } from '../model/payment/payment.types';

export class PaymentGatwayService {
  public processPayment(payment: Payment) {
    const isPaymentValid = this.mockValidation();

    const paymentStatus = isPaymentValid
      ? PaymentStatus['APPROVED']
      : PaymentStatus['FAILED'];

    return paymentStatus;
  }

  private mockValidation(): boolean {
    const randomNumber = Math.floor(Math.random() * 10);
    return randomNumber > 5;
  }
}
