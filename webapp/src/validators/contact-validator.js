import { body } from 'express-validator';

export default [
    body('name').trim().isLength({ min: 1 }).withMessage('Name is required').escape(),
    body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
    body('message').trim().isLength({ min: 1 }).withMessage('Message is required').escape(),
];
