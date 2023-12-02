import { PaymentQueue, PaymentStatus } from '../model/payment/payment.types';

export class PaymentGatwayService {
  public processPayment(payment: PaymentQueue) {
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
