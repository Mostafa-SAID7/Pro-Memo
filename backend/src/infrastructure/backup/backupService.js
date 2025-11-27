/**
 * Backup Service
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const BACKUP_DIR = path.join(__dirname, '../database/data/backups');

class BackupService {
  async createBackup() {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `backup-${timestamp}.gz`;
      const filepath = path.join(BACKUP_DIR, filename);

      // Ensure backup directory exists
      if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
      }

      const mongoUri = process.env.MONGODB_URI;
      const command = `mongodump --uri="${mongoUri}" --archive="${filepath}" --gzip`;

      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error('Backup error:', error);
            reject(error);
          } else {
            console.log('✅ Backup created:', filename);
            resolve({ filename, filepath });
          }
        });
      });
    } catch (error) {
      console.error('Backup failed:', error);
      throw error;
    }
  }

  async restoreBackup(filename) {
    try {
      const filepath = path.join(BACKUP_DIR, filename);

      if (!fs.existsSync(filepath)) {
        throw new Error('Backup file not found');
      }

      const mongoUri = process.env.MONGODB_URI;
      const command = `mongorestore --uri="${mongoUri}" --archive="${filepath}" --gzip --drop`;

      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error('Restore error:', error);
            reject(error);
          } else {
            console.log('✅ Backup restored:', filename);
            resolve({ filename });
          }
        });
      });
    } catch (error) {
      console.error('Restore failed:', error);
      throw error;
    }
  }

  async listBackups() {
    try {
      if (!fs.existsSync(BACKUP_DIR)) {
        return [];
      }

      const files = fs.readdirSync(BACKUP_DIR);
      return files
        .filter(f => f.endsWith('.gz'))
        .map(f => ({
          filename: f,
          size: fs.statSync(path.join(BACKUP_DIR, f)).size,
          created: fs.statSync(path.join(BACKUP_DIR, f)).mtime
        }))
        .sort((a, b) => b.created - a.created);
    } catch (error) {
      console.error('List backups failed:', error);
      return [];
    }
  }

  async deleteOldBackups(daysToKeep = 7) {
    try {
      const backups = await this.listBackups();
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      let deletedCount = 0;

      for (const backup of backups) {
        if (backup.created < cutoffDate) {
          const filepath = path.join(BACKUP_DIR, backup.filename);
          fs.unlinkSync(filepath);
          deletedCount++;
          console.log('🗑️  Deleted old backup:', backup.filename);
        }
      }

      return { deletedCount };
    } catch (error) {
      console.error('Delete old backups failed:', error);
      throw error;
    }
  }
}

module.exports = new BackupService();
