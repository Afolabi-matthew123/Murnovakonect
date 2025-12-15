import { PrismaClient, RoleName, UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('í¼± Seeding FM-1 baseline data...');

  // 1) School
  const school = await prisma.school.upsert({
    where: { slug: 'goldsworth' },
    update: {},
    create: {
      name: 'Goldsworth Resource Development Academy',
      slug: 'goldsworth',
      domain: 'portal.goldsworth.test',
      motto: 'Raising Golden Minds',
      primaryColor: '#004aad',
      secondaryColor: '#f5c542',
    },
  });

  // 2) Roles (SUPER_ADMIN global, PARENT+STUDENT scoped to school)
  const superAdminRole = await prisma.role.upsert({
    where: { name: RoleName.SUPER_ADMIN },
    update: {},
    create: {
      name: RoleName.SUPER_ADMIN,
      description: 'Platform super administrator',
      schoolId: null,
    },
  });

  const parentRole = await prisma.role.upsert({
    where: { name: RoleName.PARENT },
    update: {},
    create: {
      name: RoleName.PARENT,
      description: 'Parent / Guardian',
      schoolId: school.id,
    },
  });

  const studentRole = await prisma.role.upsert({
    where: { name: RoleName.STUDENT },
    update: {},
    create: {
      name: RoleName.STUDENT,
      description: 'Student',
      schoolId: school.id,
    },
  });

  // 3) Minimal permissions set (FM-1 baseline)
  const permissions = await prisma.$transaction(async (tx) => {
    const permNames = [
      'schools:read',
      'schools:create',
      'schools:update',
      'schools:delete',
      'users:read',
      'roles:read',
      'roles:update',
      'permissions:read',
      'students:read',
      'students:create',
    ];

    const created = [];
    for (const name of permNames) {
      const perm = await tx.permission.upsert({
        where: { name },
        update: {},
        create: { name, description: name },
      });
      created.push(perm);
    }
    return created;
  });

  // Attach all permissions to SUPER_ADMIN
  await prisma.role.update({
    where: { id: superAdminRole.id },
    data: {
      permissions: {
        set: permissions.map((p) => ({ id: p.id })),
      },
    },
  });

  // 4) Users (super admin, parent, student)
  const superAdminPassword = await bcrypt.hash('SuperAdmin123!', 12);
  const parentPassword = await bcrypt.hash('Parent123!', 12);
  const studentPassword = await bcrypt.hash('Student123!', 12);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@murnova.com' },
    update: {},
    create: {
      email: 'superadmin@murnova.com',
      phone: '08000000000',
      password: superAdminPassword,
      displayName: 'Platform Super Admin',
      userType: UserType.SUPER_ADMIN,
      isActive: true,
      schoolId: null,
    },
  });

  const parent = await prisma.user.upsert({
    where: { phone: '08030000001' },
    update: {},
    create: {
      email: 'parent@goldsworth.test',
      phone: '08030000001',
      password: parentPassword,
      displayName: 'Demo Parent',
      userType: UserType.PARENT,
      isActive: true,
      schoolId: school.id,
    },
  });

  const student = await prisma.user.upsert({
    where: { phone: '08030000002' },
    update: {},
    create: {
      email: 'student@goldsworth.test',
      phone: '08030000002',
      password: studentPassword,
      displayName: 'Demo Student',
      userType: UserType.STUDENT,
      isActive: true,
      schoolId: school.id,
    },
  });

  // 5) Link roles via UserRole
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: superAdmin.id, roleId: superAdminRole.id } },
    update: {},
    create: {
      userId: superAdmin.id,
      roleId: superAdminRole.id,
    },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: parent.id, roleId: parentRole.id } },
    update: {},
    create: {
      userId: parent.id,
      roleId: parentRole.id,
    },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: student.id, roleId: studentRole.id } },
    update: {},
    create: {
      userId: student.id,
      roleId: studentRole.id,
    },
  });

  // 6) Student entity + guardian relationship
  const studentProfile = await prisma.student.upsert({
    where: { admissionNo: 'GRA-001' },
    update: {},
    create: {
      firstName: 'Demo',
      lastName: 'Student',
      admissionNo: 'GRA-001',
      gender: 'M',
      schoolId: school.id,
      userId: student.id,
      guardianId: parent.id,
    },
  });

  console.log('âœ… Seed complete.');
  console.log('   School slug: goldsworth');
  console.log('   Super admin: superadmin@murnova.com / SuperAdmin123!');
  console.log('   Parent:      parent@goldsworth.test / Parent123!');
  console.log('   Student:     student@goldsworth.test / Student123!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
