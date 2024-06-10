import { body, param } from 'express-validator';

export const userCreateValidation = [
    body('firstName')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 1, max: 50 })
        .withMessage('Name must be between 1 and 50 characters long'),
    body('lastName')
        .isString()
        .withMessage('Surname must be a string')
        .isLength({ min: 1, max: 50 })
        .withMessage('Surname must be between 1 and 50 characters long'),
    body('age')
        .isInt({ min: 0, max: 120 })
        .withMessage('Age must be an integer between 0 and 120'),
    body('gender')
        .isString()
        .withMessage('Gender must be a string')
        .isLength({ min: 1, max: 10 })
        .withMessage('Gender must be between 1 and 10 characters long'),
    body('problem')
        .isBoolean()
        .withMessage('Problems must be a boolean value'),
];

export const userUpdateValidation = [
    param('id')
        .isUUID()
        .withMessage('Invalid user ID'),
    body('firstName')
        .optional()
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 1, max: 50 })
        .withMessage('Name must be between 1 and 50 characters long'),
    body('lastName')
        .optional()
        .isString()
        .withMessage('Surname must be a string')
        .isLength({ min: 1, max: 50 })
        .withMessage('Surname must be between 1 and 50 characters long'),
    body('age')
        .optional()
        .isInt({ min: 0, max: 120 })
        .withMessage('Age must be an integer between 0 and 120'),
    body('gender')
        .optional()
        .isString()
        .withMessage('Gender must be a string')
        .isLength({ min: 1, max: 10 })
        .withMessage('Gender must be between 1 and 10 characters long'),
    body('problem')
        .optional()
        .isBoolean()
        .withMessage('Problems must be a boolean value'),
];
