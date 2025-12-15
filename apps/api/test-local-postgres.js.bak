const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres', 
  password: 'postgres',
  database: 'postgres'
});

async function test() {
  try {
    await client.connect();
    console.log('✅ Connected to local PostgreSQL');
    
    // Check if our database exists
    const dbCheck = await client.query("SELECT 1 FROM pg_database WHERE datname = 'murnova_konect'");
    if (dbCheck.rows.length > 0) {
      console.log('✅ Database murnova_konect exists');
    } else {
      console.log('⚠️  Database murnova_konect does not exist, creating it...');
      await client.query('CREATE DATABASE murnova_konect');
      console.log('✅ Database murnova_konect created');
    }
    
    await client.end();
  } catch (error) {
    console.error('❌ Cannot connect to local PostgreSQL:', error.message);
    console.log('��� Try these passwords: "", "password", "admin" or check PostgreSQL service');
  }
}

test();
