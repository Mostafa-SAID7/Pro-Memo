/**
 * Migration: Create Indexes
 * Date: 2025-11-27
 */

module.exports = {
  name: '001_create_indexes',
  
  async up(db) {
    console.log('Running migration: Create indexes...');
    
    // Users collection indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ createdAt: -1 });
    
    // Projects collection indexes
    await db.collection('projects').createIndex({ owner: 1 });
    await db.collection('projects').createIndex({ status: 1 });
    await db.collection('projects').createIndex({ createdAt: -1 });
    
    // Tasks collection indexes
    await db.collection('tasks').createIndex({ project: 1 });
    await db.collection('tasks').createIndex({ assignee: 1 });
    await db.collection('tasks').createIndex({ status: 1 });
    await db.collection('tasks').createIndex({ dueDate: 1 });
    await db.collection('tasks').createIndex({ createdAt: -1 });
    
    console.log('✅ Indexes created successfully');
  },
  
  async down(db) {
    console.log('Rolling back migration: Drop indexes...');
    
    // Drop indexes (keep _id index)
    await db.collection('users').dropIndexes();
    await db.collection('projects').dropIndexes();
    await db.collection('tasks').dropIndexes();
    
    console.log('✅ Indexes dropped successfully');
  }
};
