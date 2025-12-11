import { IEvent } from './interfaces/event.interface';

export abstract class DomainEvent implements IEvent {
  public readonly id: string;
  public readonly timestamp: Date;
  public readonly version: string = '1.0';
  public readonly source: string = 'murnova-konect-api';

  constructor(
    public readonly type: string,
    public readonly data: any,
    public readonly metadata?: Record<string, any>
  ) {
    this.id = this.generateId();
    this.timestamp = new Date();
  }

  private generateId(): string {
    return `${this.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Student Domain Events
export class StudentRegisteredEvent extends DomainEvent {
  constructor(data: { studentId: string; schoolId: string; guardianId?: string }) {
    super('student.registered', data);
  }
}

export class AttendanceRecordedEvent extends DomainEvent {
  constructor(data: { studentId: string; date: Date; status: string; recordedBy: string }) {
    super('attendance.recorded', data);
  }
}

export class PaymentReceivedEvent extends DomainEvent {
  constructor(data: { paymentId: string; studentId: string; amount: number; method: string }) {
    super('payment.received', data);
  }
}

export class BehaviorIncidentEvent extends DomainEvent {
  constructor(data: { incidentId: string; studentId: string; type: string; points: number }) {
    super('behavior.incident', data);
  }
}

export class ResultPublishedEvent extends DomainEvent {
  constructor(data: { resultId: string; studentId: string; subject: string; score: number }) {
    super('result.published', data);
  }
}

// School Domain Events
export class SchoolCreatedEvent extends DomainEvent {
  constructor(data: { schoolId: string; name: string; slug: string }) {
    super('school.created', data);
  }
}

export class ParentSubscribedEvent extends DomainEvent {
  constructor(data: { subscriptionId: string; parentId: string; studentId: string; termId: string }) {
    super('parent.subscribed', data);
  }
}
