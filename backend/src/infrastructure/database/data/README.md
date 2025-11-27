# Data Directory

## Purpose
This directory contains data-related files for the application.

## Structure

### /seeds
Database seed files for initial data population.

Example:
```javascript
// seeds/users.seed.js
module.exports = [
  { name: 'Admin', email: 'admin@example.com', role: 'admin' },
  { name: 'User', email: 'user@example.com', role: 'user' }
];
```

### /fixtures
Test fixtures for development and testing.

### /backups
Database backup files (excluded from git).

### /exports
Exported data files (CSV, JSON, Excel).

### /imports
Data files ready for import.

## Usage

### Seed Database
```bash
npm run seed
```

### Backup Database
```bash
npm run backup
```

### Import Data
```bash
npm run import -- --file=data/imports/tasks.csv
```
