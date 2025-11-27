/**
 * Seed Admin User Script
 * Creates the admin user for the application
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const seedUser = async () => {
  try {
    console.log('🔄 Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Admin credentials
    const adminEmail = 'm.ssaid356@gmail.com';
    const adminPassword = 'Memo@3560';
    const adminName = 'Admin';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      // Update password if user exists
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      existingAdmin.password = hashedPassword;
      existingAdmin.role = 'admin';
      existingAdmin.isActive = true;
      await existingAdmin.save();
      console.log('✅ Admin user updated successfully!');
    } else {
      // Create admin user
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      const admin = new User({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });

      await admin.save();
      console.log('✅ Admin user created successfully!');
    }

    console.log('\n👑 Admin Credentials:');
    console.log('   Email: m.ssaid356@gmail.com');
    console.log('   Password: Memo@3560');
    console.log('\n🌐 Login at: http://localhost:3000/memo/login');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  }
};

seedUser();
