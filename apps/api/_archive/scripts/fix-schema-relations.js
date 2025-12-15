const fs = require('fs');
const schemaPath = 'prisma/schema.prisma';

console.log("í´§ Fixing Prisma schema relations...");

let schema = fs.readFileSync(schemaPath, 'utf8');

// 1. Keep User model relations AS IS (lines 159-160)
// 2. Fix Student model: remove fields/references from user relation
schema = schema.replace(
  '  user             User?               @relation(fields: [userId], references: [id])',
  '  user             User?               @relation("UserStudent")'
);

// 3. Fix Staff model: remove fields/references from user relation  
schema = schema.replace(
  '  user          User?               @relation(fields: [userId], references: [id])',
  '  user          User?               @relation("UserStaff")'
);

// 4. Update User model relations to include relation names
schema = schema.replace(
  '  studentProfile     Student?   @relation(fields: [studentId], references: [admissionNo])',
  '  studentProfile     Student?   @relation("UserStudent", fields: [studentId], references: [admissionNo])'
);

schema = schema.replace(
  '  staffProfile       Staff?     @relation(fields: [staffId], references: [staffNo])',
  '  staffProfile       Staff?     @relation("UserStaff", fields: [staffId], references: [staffNo])'
);

// 5. Remove duplicate "Profile relations" comment
schema = schema.replace('  // Profile relations\n\n  // Profile relations', '  // Profile relations');

fs.writeFileSync(schemaPath, schema, 'utf8');

console.log("âœ… Fixed schema relations!");
console.log("\ní³‹ Changes made:");
console.log("1. Added relation names: UserStudent, UserStaff");
console.log("2. Made Student.user and Staff.user relations implicit");
console.log("3. Kept User.studentProfile and User.staffProfile with explicit mapping");
console.log("\ní¾¯ Result:");
console.log("â€¢ User â†’ Student: via studentId â†’ admissionNo");
console.log("â€¢ User â†’ Staff: via staffId â†’ staffNo");
console.log("â€¢ Student â†’ User: implicit relation");
console.log("â€¢ Staff â†’ User: implicit relation");
console.log("\níº€ Next: npx prisma generate && pnpm run build");
