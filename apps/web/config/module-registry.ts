import { AttendanceModule } from '@/modules/attendance';
import { PaymentModule } from '@/modules/payment';
import { ResultsModule } from '@/modules/results';

export const MODULE_REGISTRY = {
  staff: {
    primary: AttendanceModule,
    left: ResultsModule,
    right: PaymentModule,
  },
  parent: {
    primary: ResultsModule,
    right: PaymentModule,
  },
  student: {
    primary: AttendanceModule,
  },
};
