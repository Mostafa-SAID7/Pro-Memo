/**
 * Seed: Admin User
 * Creates default admin user for development
 */

const bcrypt = require('bcryptjs');

module.exports = {
  name: 'admin_user',
  
  async seed(db) {
    console.log('Seeding: Admin user...');
    
    const existingAdmin = await db.collection('users').findOne({ 
      email: 'admin@promemo.com' 
    });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      return;
    }
    
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    await db.collection('users').insertOne({
      name: 'Admin User',
      email: 'admin@promemo.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log('✅ Admin user created');
    console.log('   Email: admin@promemo.com');
    console.log('   Password: Admin@123');
  }
};
