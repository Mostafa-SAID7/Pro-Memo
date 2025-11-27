/**
 * Migration Runner
 * Runs database migrations
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MIGRATIONS_DIR = path.join(__dirname, 'mongodb');
const MIGRATION_COLLECTION = 'migrations';

async function runMigrations() {
  try {
    console.log('🚀 Starting migrations...\n');
    
    const db = mongoose.connection.db;
    
    // Get completed migrations
    const completedMigrations = await db
      .collection(MIGRATION_COLLECTION)
      .find({})
      .toArray();
    
    const completedNames = completedMigrations.map(m => m.name);
    
    // Get migration files
    const files = fs.readdirSync(MIGRATIONS_DIR)
      .filter(f => f.endsWith('.js'))
      .sort();
    
    let ranCount = 0;
    
    for (const file of files) {
      const migration = require(path.join(MIGRATIONS_DIR, file));
      
      if (completedNames.includes(migration.name)) {
        console.log(`⏭️  Skipping: ${migration.name} (already run)`);
        continue;
      }
      
      console.log(`▶️  Running: ${migration.name}`);
      await migration.up(db);
      
      // Record migration
      await db.collection(MIGRATION_COLLECTION).insertOne({
        name: migration.name,
        file: file,
        runAt: new Date()
      });
      
      ranCount++;
      console.log(`✅ Completed: ${migration.name}\n`);
    }
    
    console.log(`\n🎉 Migrations complete! Ran ${ranCount} migration(s)`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

async function rollbackMigration() {
  try {
    console.log('🔄 Rolling back last migration...\n');
    
    const db = mongoose.connection.db;
    
    // Get last migration
    const lastMigration = await db
      .collection(MIGRATION_COLLECTION)
      .findOne({}, { sort: { runAt: -1 } });
    
    if (!lastMigration) {
      console.log('⚠️  No migrations to rollback');
      return;
    }
    
    const migrationPath = path.join(MIGRATIONS_DIR, lastMigration.file);
    const migration = require(migrationPath);
    
    console.log(`▶️  Rolling back: ${migration.name}`);
    await migration.down(db);
    
    // Remove migration record
    await db.collection(MIGRATION_COLLECTION).deleteOne({ 
      _id: lastMigration._id 
    });
    
    console.log(`✅ Rolled back: ${migration.name}`);
  } catch (error) {
    console.error('❌ Rollback failed:', error);
    throw error;
  }
}

module.exports = {
  runMigrations,
  rollbackMigration
};
