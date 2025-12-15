const fs = require('fs');
const path = require('path');

const prismaservicePath = path.resolve('src/database/prisma.service.ts');
console.log('Checking PrismaService at:', prismaservicePath);

if (!fs.existsSync(prismaservicePath)) {
  console.log('❌ ERROR: PrismaService file is missing!');
  console.log('Looking for backups...');
  
  // Look for backups
  const backups = [
    'src/database/prisma.service.ts.backup',
    'src/database/prisma.service.backup.ts',
    'src/database/prisma.service.ts.original'
  ];
  
  let found = false;
  backups.forEach(backup => {
    const backupPath = path.resolve(backup);
    if (fs.existsSync(backupPath)) {
      console.log('✅ Found backup:', backup);
      console.log('Restoring from backup...');
      fs.copyFileSync(backupPath, prismaservicePath);
      found = true;
    }
  });
  
  if (!found) {
    console.log('❌ No backups found. Creating original PrismaService...');
    
    // Create original PrismaService from your original code
    const originalCode = `import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private _prisma: any;

  private get prisma() {
    if (!this._prisma) {
      const { PrismaClient } = require('@prisma/client');
      this._prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
      });
    }
    return this._prisma;
  }

  async onModuleInit() {
    // Connection will be established on first use
    console.log('PrismaService initialized (lazy loading)');
  }

  async onModuleDestroy() {
    if (this._prisma) {
      await this._prisma.\$disconnect();
    }
  }

  // Proxy all PrismaClient methods and properties
  get school() { return this.prisma.school; }
  get user() { return this.prisma.user; }
  get student() { return this.prisma.student; }
  get staff() { return this.prisma.staff; }
  get attendanceRecord() { return this.prisma.attendanceRecord; }
  get feeInvoice() { return this.prisma.feeInvoice; }
  get payment() { return this.prisma.payment; }
  get result() { return this.prisma.result; }
  get role() { return this.prisma.role; }
  get permission() { return this.prisma.permission; }
  get userRole() { return this.prisma.userRole; }
  get classRoom() { return this.prisma.classRoom; }
  get academicSession() { return this.prisma.academicSession; }
  get term() { return this.prisma.term; }
  get timetableSlot() { return this.prisma.timetableSlot; }
  get lessonPlan() { return this.prisma.lessonPlan; }
  get behaviourIncident() { return this.prisma.behaviourIncident; }
  get behaviourPoint() { return this.prisma.behaviourPoint; }
  get parentPortalSubscription() { return this.prisma.parentPortalSubscription; }
  get analyticsSnapshot() { return this.prisma.analyticsSnapshot; }
  get schoolBranding() { return this.prisma.schoolBranding; }
  get schoolDomain() { return this.prisma.schoolDomain; }
  get schoolSitePage() { return this.prisma.schoolSitePage; }
  get refreshToken() { return this.prisma.refreshToken; }

  // Raw query methods
  \$queryRaw(...args: any[]) { return this.prisma.\$queryRaw(...args); }
  \$executeRaw(...args: any[]) { return this.prisma.\$executeRaw(...args); }
  \$connect() { return this.prisma.\$connect(); }
  \$disconnect() { return this.prisma.\$disconnect(); }
  \$transaction(...args: any[]) { return this.prisma.\$transaction(...args); }
  \$on(...args: any[]) { return this.prisma.\$on(...args); }
}`;
    
    // Ensure directory exists
    fs.mkdirSync(path.dirname(prismaservicePath), { recursive: true });
    fs.writeFileSync(prismaservicePath, originalCode, 'utf8');
    console.log('✅ Recreated original PrismaService');
  }
} else {
  console.log('✅ PrismaService file exists');
  
  // Check if it's original
  const content = fs.readFileSync(prismaservicePath, 'utf8');
  const isOriginal = content.includes('private get prisma()') && 
                     content.includes('const { PrismaClient } = require') &&
                     content.includes('lazy loading');
  
  if (isOriginal) {
    console.log('✅ PrismaService is in original form');
  } else {
    console.log('⚠️ PrismaService has been modified');
    console.log('Creating backup and restoring original...');
    
    // Create backup
    const backupPath = prismaservicePath + '.backup-' + Date.now();
    fs.copyFileSync(prismaservicePath, backupPath);
    console.log('Created backup:', backupPath);
    
    // Restore original
    const originalCode = `import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private _prisma: any;

  private get prisma() {
    if (!this._prisma) {
      const { PrismaClient } = require('@prisma/client');
      this._prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
      });
    }
    return this._prisma;
  }

  async onModuleInit() {
    // Connection will be established on first use
    console.log('PrismaService initialized (lazy loading)');
  }

  async onModuleDestroy() {
    if (this._prisma) {
      await this._prisma.\$disconnect();
    }
  }

  // Proxy all PrismaClient methods and properties
  get school() { return this.prisma.school; }
  get user() { return this.prisma.user; }
  get student() { return this.prisma.student; }
  get staff() { return this.prisma.staff; }
  get attendanceRecord() { return this.prisma.attendanceRecord; }
  get feeInvoice() { return this.prisma.feeInvoice; }
  get payment() { return this.prisma.payment; }
  get result() { return this.prisma.result; }
  get role() { return this.prisma.role; }
  get permission() { return this.prisma.permission; }
  get userRole() { return this.prisma.userRole; }
  get classRoom() { return this.prisma.classRoom; }
  get academicSession() { return this.prisma.academicSession; }
  get term() { return this.prisma.term; }
  get timetableSlot() { return this.prisma.timetableSlot; }
  get lessonPlan() { return this.prisma.lessonPlan; }
  get behaviourIncident() { return this.prisma.behaviourIncident; }
  get behaviourPoint() { return this.prisma.behaviourPoint; }
  get parentPortalSubscription() { return this.prisma.parentPortalSubscription; }
  get analyticsSnapshot() { return this.prisma.analyticsSnapshot; }
  get schoolBranding() { return this.prisma.schoolBranding; }
  get schoolDomain() { return this.prisma.schoolDomain; }
  get schoolSitePage() { return this.prisma.schoolSitePage; }
  get refreshToken() { return this.prisma.refreshToken; }

  // Raw query methods
  \$queryRaw(...args: any[]) { return this.prisma.\$queryRaw(...args); }
  \$executeRaw(...args: any[]) { return this.prisma.\$executeRaw(...args); }
  \$connect() { return this.prisma.\$connect(); }
  \$disconnect() { return this.prisma.\$disconnect(); }
  \$transaction(...args: any[]) { return this.prisma.\$transaction(...args); }
  \$on(...args: any[]) { return this.prisma.\$on(...args); }
}`;
    
    fs.writeFileSync(prismaservicePath, originalCode, 'utf8');
    console.log('✅ Restored original PrismaService');
  }
}
