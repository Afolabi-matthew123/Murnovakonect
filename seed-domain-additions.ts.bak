  // Create custom domain examples
  console.log('Creating custom domain examples...');
  await prisma.schoolDomain.createMany({
    data: [
      {
        schoolId: demoSchool.id,
        host: 'www.goldsworth.com.ng',
        type: 'WEBSITE',
        isPrimary: false,
        verified: true,
      },
      {
        schoolId: demoSchool.id,
        host: 'portal.goldsworth.com.ng', 
        type: 'PORTAL',
        verified: true,
      },
      {
        schoolId: demoSchool.id,
        host: 'timetable.goldsworth.com.ng',
        type: 'MODULE',
        module: 'timetable',
        verified: true,
      },
      {
        schoolId: demoSchool.id,
        host: 'homework.goldsworth.com.ng',
        type: 'MODULE', 
        module: 'homework',
        verified: true,
      },
    ],
  });
