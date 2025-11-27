/**
 * Task Scheduler Service
 */

class Scheduler {
  constructor() {
    this.tasks = new Map();
  }

  schedule(name, interval, callback) {
    if (this.tasks.has(name)) {
      console.log(`⚠️  Task "${name}" already scheduled`);
      return;
    }

    const intervalId = setInterval(async () => {
      try {
        console.log(`⏰ Running scheduled task: ${name}`);
        await callback();
      } catch (error) {
        console.error(`❌ Scheduled task "${name}" failed:`, error);
      }
    }, interval);

    this.tasks.set(name, intervalId);
    console.log(`✅ Scheduled task: ${name} (every ${interval}ms)`);
  }

  cancel(name) {
    if (this.tasks.has(name)) {
      clearInterval(this.tasks.get(name));
      this.tasks.delete(name);
      console.log(`🛑 Cancelled task: ${name}`);
      return true;
    }
    return false;
  }

  cancelAll() {
    for (const [name, intervalId] of this.tasks) {
      clearInterval(intervalId);
      console.log(`🛑 Cancelled task: ${name}`);
    }
    this.tasks.clear();
  }

  listTasks() {
    return Array.from(this.tasks.keys());
  }
}

module.exports = new Scheduler();
