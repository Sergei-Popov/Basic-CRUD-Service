import { body, oneOf, validationResult } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateCreateUser = [
  body('first_name').notEmpty().withMessage('first_name is required'),
  body('last_name').notEmpty().withMessage('last_name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  handleValidationErrors,
];

export const validateUpdateUser = [
  oneOf([body('first_name').exists(), body('last_name').exists(), body('email').exists()], {
    message: 'At least one field (first_name, last_name, or email) must be provided for an update',
  }),
  body('email').optional().isEmail().withMessage('If provided, email must be a valid address'),
  handleValidationErrors,
];
