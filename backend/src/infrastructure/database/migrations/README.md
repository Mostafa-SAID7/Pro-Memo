# Migrations Directory

## Purpose
Database migrations for schema changes and data transformations.

## Structure

### /mongodb
MongoDB-specific migrations.

### /scripts
Migration scripts and utilities.

### /rollback
Rollback scripts for reverting migrations.

## Migration File Format

```javascript
// migrations/mongodb/001_create_users_collection.js
module.exports = {
  up: async (db) => {
    await db.createCollection('users');
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
  },
  
  down: async (db) => {
    await db.collection('users').drop();
  }
};
```

## Usage

### Run Migrations
```bash
npm run migrate
```

### Rollback Last Migration
```bash
npm run migrate:rollback
```

### Create New Migration
```bash
npm run migrate:create -- --name=add_user_roles
```

## Best Practices

1. **Always test migrations** in development first
2. **Create rollback scripts** for every migration
3. **Use timestamps** in migration filenames
4. **Document changes** in migration files
5. **Backup database** before running migrations
