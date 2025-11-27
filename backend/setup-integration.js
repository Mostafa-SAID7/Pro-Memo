/**
 * Backend Integration Setup Script
 * Run this to verify backend is ready for frontend integration
 */

const mongoose = require('mongoose');
require('dotenv').config();

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Database connection successful');
    await mongoose.connection.close();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

const checkEnvVariables = () => {
  const required = ['PORT', 'MONGODB_URI', 'JWT_SECRET', 'FRONTEND_URL'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing.join(', '));
    return false;
  }
  
  console.log('✅ All required environment variables are set');
  return true;
};

const checkDependencies = () => {
  try {
    require('express');
    require('cors');
    require('jsonwebtoken');
    require('bcryptjs');
    require('express-validator');
    console.log('✅ All required dependencies are installed');
    return true;
  } catch (error) {
    console.error('❌ Missing dependencies. Run: npm install');
    return false;
  }
};

const main = async () => {
  console.log('\n🔍 Checking Backend Integration Setup...\n');
  
  const envCheck = checkEnvVariables();
  const depsCheck = checkDependencies();
  const dbCheck = await checkDatabase();
  
  console.log('\n' + '='.repeat(50));
  
  if (envCheck && depsCheck && dbCheck) {
    console.log('✅ Backend is ready for frontend integration!');
    console.log('\nNext steps:');
    console.log('1. Start backend: npm start');
    console.log('2. Start frontend: cd ../frontend && npm run dev');
    console.log('3. Access app: http://localhost:3000');
  } else {
    console.log('❌ Backend setup incomplete. Fix the issues above.');
  }
  
  console.log('='.repeat(50) + '\n');
  process.exit(0);
};

main();
