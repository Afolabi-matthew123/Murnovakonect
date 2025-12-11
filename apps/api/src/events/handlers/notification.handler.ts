import { Injectable, Logger } from '@nestjs/common';
import { IEventHandler } from '../interfaces/event.interface';
import { PrismaService } from '../../database/prisma.service';
import { 
  PaymentReceivedEvent,
  BehaviorIncidentEvent,
  ResultPublishedEvent,
  ParentSubscribedEvent
} from '../domain-events';

@Injectable()
export class NotificationEventHandler implements IEventHandler<any> {
  private readonly logger = new Logger(NotificationEventHandler.name);

  constructor(private prisma: PrismaService) {}

  async handle(event: any): Promise<void> {
    try {
      switch (event.type) {
        case 'payment.received':
          await this.handlePaymentNotification(event);
          break;
        case 'behavior.incident':
          await this.handleBehaviorNotification(event);
          break;
        case 'result.published':
          await this.handleResultNotification(event);
          break;
        case 'parent.subscribed':
          await this.handleSubscriptionNotification(event);
          break;
        default:
          this.logger.debug(`No notification required for: ${event.type}`);
      }
    } catch (error: any) {
      this.logger.error(`Error handling notification event ${event.type}:`, error);
    }
  }

  private async handlePaymentNotification(event: PaymentReceivedEvent): Promise<void> {
    this.logger.log(`Sending payment confirmation for: ${event.data.paymentId}`);
    // Send email/SMS confirmation to parent
    // Notify school bursar
    // Update parent portal
  }

  private async handleBehaviorNotification(event: BehaviorIncidentEvent): Promise<void> {
    this.logger.log(`Sending behavior alert for incident: ${event.data.incidentId}`);
    // Notify parents if serious incident
    // Alert school administration
    // Log for counseling follow-up
  }

  private async handleResultNotification(event: ResultPublishedEvent): Promise<void> {
    this.logger.log(`Sending result notification for: ${event.data.resultId}`);
    // Notify parents via preferred channel
    // Update student/parent portal
    // Trigger performance review if needed
  }

  private async handleSubscriptionNotification(event: ParentSubscribedEvent): Promise<void> {
    this.logger.log(`Sending subscription confirmation: ${event.data.subscriptionId}`);
    // Send welcome email with portal access
    // Notify school administration
    // Setup parent portal account
  }
}
