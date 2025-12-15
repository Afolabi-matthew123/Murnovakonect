const fs = require('fs');
const schemaPath = 'prisma/schema.prisma';

console.log("í´§ Adding missing relations to User model...");

let schema = fs.readFileSync(schemaPath, 'utf8');

// Find the User model
const userModelStart = schema.indexOf('model User {');
const userModelEnd = schema.indexOf('\n}\n', userModelStart);
const userModel = schema.substring(userModelStart, userModelEnd + 3);

// Check if relations already exist
if (!userModel.includes('studentProfile')) {
  console.log("âž• Adding studentProfile relation...");
  
  // Find where to add the relation (before the closing indexes)
  const beforeIndexes = userModel.lastIndexOf('  // Parent-specific fields');
  if (beforeIndexes > 0) {
    const newUserModel = userModel.substring(0, beforeIndexes) +
      '  // Profile relations\n' +
      '  studentProfile     Student?   @relation(fields: [studentId], references: [admissionNo])\n' +
      '  staffProfile       Staff?     @relation(fields: [staffId], references: [staffNo])\n\n' +
      userModel.substring(beforeIndexes);
    
    // Replace the User model in the schema
    schema = schema.substring(0, userModelStart) + newUserModel + schema.substring(userModelEnd + 3);
  }
}

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log("âœ… Added missing relations to User model");
console.log("\ní³‹ What was added:");
console.log("1. studentProfile Student? @relation(fields: [studentId], references: [admissionNo])");
console.log("2. staffProfile Staff? @relation(fields: [staffId], references: [staffNo])");
console.log("\ní¾¯ This completes the bidirectional relations:");
console.log("   User.studentId â†” Student.admissionNo");
console.log("   User.staffId â†” Staff.staffNo");
console.log("\níº€ Next steps:");
console.log("1. npx prisma generate");
console.log("2. pnpm run build");
