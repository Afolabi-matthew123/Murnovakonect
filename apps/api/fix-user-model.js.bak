const fs = require('fs');
const schemaPath = 'prisma/schema.prisma';

let schema = fs.readFileSync(schemaPath, 'utf8');

// First, let's find and display the User model section
console.log("Ì¥ç Current User Model:");
const userModelStart = schema.indexOf('model User {');
const userModelEnd = schema.indexOf('\n}\n', userModelStart);
const userModel = schema.substring(userModelStart, userModelEnd + 3);
console.log(userModel);

// Fix 1: Remove problematic relation lines
schema = schema.replace(/  studentProfile\s+Student\?\s*@relation\("UserStudent"\)[\r\n]/g, '');
schema = schema.replace(/  staffProfile\s+Staff\?\s*@relation\("UserStaff"\)[\r\n]/g, '');

// Fix 2: Also remove from Student and Staff models
const studentModelStart = schema.indexOf('model Student {');
const studentModelEnd = schema.indexOf('\n}\n', studentModelStart);
const studentModelSection = schema.substring(studentModelStart, studentModelEnd + 3);

if (studentModelSection.includes('@relation("UserStudent"')) {
  schema = schema.replace(/  user\s+User\?\s*@relation\("UserStudent", fields: \[userId\], references: \[id\]\)[\r\n]/g, '  user             User?               @relation(fields: [userId], references: [id])\n');
}

const staffModelStart = schema.indexOf('model Staff {');
const staffModelEnd = schema.indexOf('\n}\n', staffModelStart);
const staffModelSection = schema.substring(staffModelStart, staffModelEnd + 3);

if (staffModelSection.includes('@relation("UserStaff"')) {
  schema = schema.replace(/  user\s+User\?\s*@relation\("UserStaff", fields: \[userId\], references: \[id\]\)[\r\n]/g, '  user          User?               @relation(fields: [userId], references: [id])\n');
}

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log('\n‚úÖ Removed problematic relations from schema');
console.log('ÌæØ Now run: npx prisma migrate dev --name "fix-relations"');
