import express from 'express';

import { validateCreateUser, validateUpdateUser, validateUserId } from '../middlewares/index.js';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', validateCreateUser, createUser);

router.get('/:id', validateUserId, getUserById);
router.delete('/:id', validateUserId, deleteUser);
router.patch('/:id', validateUserId, validateUpdateUser, updateUser);

export default router;
