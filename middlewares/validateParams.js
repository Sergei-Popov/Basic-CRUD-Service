import { param, validationResult } from 'express-validator';
import pool from '../data/db.js';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  next();
};

export const validateUserId = [
  param('id').custom(async (id, { req }) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [
        id,
      ]);
      const user = result.rows[0];
      if (!user) {
        throw new Error('User not found');
      }

      req.user = user;
      return true;
    } catch (err) {
      throw err;
    }
  }),
  handleValidationErrors,
];
