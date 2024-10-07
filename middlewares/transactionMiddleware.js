import { body } from 'express-validator';

export const transactionValidator = [
    body('type')
      .isIn(['credit', 'debit'])
      .withMessage('Transaction type must be either "credit" or "debit"'),
    body('amount')
      .isFloat({ gt: 0 })
      .withMessage('Amount must be a positive number'),
    body('description')
      .isLength({ min: 5 })
      .withMessage('Description must be at least 5 characters long'),
  ];