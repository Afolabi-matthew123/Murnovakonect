import { Injectable, Logger } from '@nestjs/common';
import { IEventHandler } from '../interfaces/event.interface';
import { PrismaService } from '../../database/prisma.service';
import { 
  StudentRegisteredEvent, 
  AttendanceRecordedEvent,
  PaymentReceivedEvent,
  BehaviorIncidentEvent,
  ResultPublishedEvent 
} from '../domain-events';

@Injectable()
export class AnalyticsEventHandler implements IEventHandler<any> {
  private readonly logger = new Logger(AnalyticsEventHandler.name);

  constructor(private prisma: PrismaService) {}

  async handle(event: any): Promise<void> {
    try {
      switch (event.type) {
        case 'student.registered':
          await this.handleStudentRegistered(event);
          break;
        case 'attendance.recorded':
          await this.handleAttendanceRecorded(event);
          break;
        case 'payment.received':
          await this.handlePaymentReceived(event);
          break;
        case 'behavior.incident':
          await this.handleBehaviorIncident(event);
          break;
        case 'result.published':
          await this.handleResultPublished(event);
          break;
        default:
          this.logger.debug(`Unhandled event type: ${event.type}`);
      }
    } catch (error: any) {
      this.logger.error(`Error handling event ${event.type}:`, error);
    }
  }

  private async handleStudentRegistered(event: StudentRegisteredEvent): Promise<void> {
    this.logger.log(`Updating analytics for new student: ${event.data.studentId}`);
    // Update student count analytics
    // Update demographic analytics
    // Trigger welcome communications
  }

  private async handleAttendanceRecorded(event: AttendanceRecordedEvent): Promise<void> {
    this.logger.log(`Processing attendance analytics for student: ${event.data.studentId}`);
    // Update attendance rate calculations
    // Trigger alerts for poor attendance
    // Update class/school attendance stats
  }

  private async handlePaymentReceived(event: PaymentReceivedEvent): Promise<void> {
    this.logger.log(`Processing payment analytics: ${event.data.paymentId}`);
    // Update revenue analytics
    // Update fee collection rates
    // Trigger receipt generation
  }

  private async handleBehaviorIncident(event: BehaviorIncidentEvent): Promise<void> {
    this.logger.log(`Processing behavior analytics: ${event.data.incidentId}`);
    // Update behavior trend analytics
    // Trigger parent notifications if threshold exceeded
    // Update student behavior score
  }

  private async handleResultPublished(event: ResultPublishedEvent): Promise<void> {
    this.logger.log(`Processing result analytics: ${event.data.resultId}`);
    // Update academic performance analytics
    // Calculate class/subject averages
    // Trigger performance alerts
  }
}
