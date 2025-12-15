const { Client } = require('pg');
const bcrypt = require('bcrypt');

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/murnova_konect'
});

async function main() {
  console.log('Ìº± Starting direct database seeding...');
  
  try {
    await client.connect();
    console.log('‚úÖ Connected to database');

    // Create basic data using raw SQL
    console.log('Ì≥¶ Seeding basic data...');
    
    // Create super admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const userId = 'superadmin-' + Date.now();
    
    await client.query(`
      INSERT INTO "User" (id, email, "displayName", password, "isActive", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      ON CONFLICT (email) DO NOTHING
    `, [userId, 'superadmin@murnova.com', 'Super Administrator', hashedPassword, true]);

    console.log('‚úÖ Created super admin user');
    
    // Create demo school
    const schoolId = 'school-' + Date.now();
    await client.query(`
      INSERT INTO "School" (id, name, slug, domain, "primaryColor", "secondaryColor", motto, tagline, vision, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      ON CONFLICT (slug) DO NOTHING
    `, [schoolId, 'Demo Academy', 'demo-academy', 'demo-academy.com', '#3B82F6', '#1E40AF', 'Excellence in Education', 'Building Future Leaders', 'To be the leading institution in innovative education']);

    console.log('‚úÖ Created demo school');
    
    console.log('Ìæâ Basic seeding completed!');
    console.log('');
    console.log('Ì¥ë Default login credentials:');
    console.log('   Super Admin: superadmin@murnova.com / admin123');
    console.log('Ìø´ Demo School: demo-academy');
    
  } catch (error) {
    console.error('‚ùå Seeding failed:', error.message);
  } finally {
    await client.end();
    console.log('‚úÖ Database connection closed');
  }
}

main();
