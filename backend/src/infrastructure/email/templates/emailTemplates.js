/**
 * Email Templates
 */

const emailTemplates = {
  welcome: (name) => ({
    subject: 'Welcome to Pro Memo!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6;">Welcome to Pro Memo!</h1>
        <p>Hi ${name},</p>
        <p>Thank you for joining Pro Memo. We're excited to have you on board!</p>
        <a href="${process.env.FRONTEND_URL}" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px;">
          Go to Dashboard
        </a>
      </div>
    `,
    text: `Welcome to Pro Memo, ${name}!`
  }),

  taskAssigned: (assigneeName, taskTitle, assignerName, projectName) => ({
    subject: `New Task Assigned: ${taskTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">New Task Assigned</h2>
        <p>Hi ${assigneeName},</p>
        <p><strong>${assignerName}</strong> has assigned you a new task:</p>
        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px;">
          <h3>${taskTitle}</h3>
          <p>Project: ${projectName}</p>
        </div>
      </div>
    `,
    text: `${assignerName} assigned you: ${taskTitle}`
  }),

  deadlineReminder: (userName, taskTitle, dueDate) => ({
    subject: `Reminder: Task Due Soon - ${taskTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b;">⏰ Deadline Reminder</h2>
        <p>Hi ${userName},</p>
        <p>Your task is due soon:</p>
        <div style="background-color: #fef3c7; padding: 16px; border-radius: 8px;">
          <h3>${taskTitle}</h3>
          <p>Due: ${new Date(dueDate).toLocaleDateString()}</p>
        </div>
      </div>
    `,
    text: `Reminder: ${taskTitle} is due on ${new Date(dueDate).toLocaleDateString()}`
  })
};

module.exports = emailTemplates;
