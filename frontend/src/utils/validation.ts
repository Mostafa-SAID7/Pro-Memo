/**
 * Form validation utilities
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  message?: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

export interface ValidationErrors {
  [key: string]: string;
}

export class FormValidator {
  static validate(data: Record<string, string>, rules: ValidationRules): ValidationErrors {
    const errors: ValidationErrors = {};

    Object.keys(rules).forEach((field) => {
      const value = data[field] || '';
      const fieldRules = rules[field];

      for (const rule of fieldRules) {
        if (rule.required && !value.trim()) {
          errors[field] = rule.message || `${field} is required`;
          break;
        }

        if (rule.minLength && value.length < rule.minLength) {
          errors[field] = rule.message || `${field} must be at least ${rule.minLength} characters`;
          break;
        }

        if (rule.maxLength && value.length > rule.maxLength) {
          errors[field] = rule.message || `${field} must not exceed ${rule.maxLength} characters`;
          break;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errors[field] = rule.message || `${field} format is invalid`;
          break;
        }

        if (rule.custom && !rule.custom(value)) {
          errors[field] = rule.message || `${field} is invalid`;
          break;
        }
      }
    });

    return errors;
  }

  static isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isStrongPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return strongPasswordRegex.test(password);
  }

  static passwordsMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }
}

// Common validation rules
export const commonRules = {
  email: [
    { required: true, message: 'Email is required' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
  ],
  password: [
    { required: true, message: 'Password is required' },
    { minLength: 6, message: 'Password must be at least 6 characters' },
  ],
  strongPassword: [
    { required: true, message: 'Password is required' },
    { minLength: 8, message: 'Password must be at least 8 characters' },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must contain uppercase, lowercase, and number',
    },
  ],
  name: [
    { required: true, message: 'Name is required' },
    { minLength: 2, message: 'Name must be at least 2 characters' },
    { maxLength: 50, message: 'Name must not exceed 50 characters' },
  ],
};
