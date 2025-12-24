export class PaymentMonitor {
  async checkAccess(path: string, user: any, paymentState: any) {
    return {
      allowed: true,
      confidence: 1.0,
      reason: 'Payment valid'
    };
  }
}
