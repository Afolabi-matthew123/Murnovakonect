export interface IEvent {
  id: string;
  type: string;
  timestamp: Date;
  version: string;
  source: string;
  data: any;
  metadata?: Record<string, any>;
}

export interface IEventHandler<T extends IEvent> {
  handle(event: T): Promise<void>;
}

export interface IEventEmitter {
  emit(event: IEvent): Promise<void>;
  subscribe(eventType: string, handler: IEventHandler<any>): void;
}
