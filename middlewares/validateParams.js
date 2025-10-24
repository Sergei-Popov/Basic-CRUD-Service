import { param, validationResult } from 'express-validator';
import { users } from "../data/db.js";

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(404).json({ errors: errors.array() });
	}
	next();
};

export const validateUserId = [
	param('id').custom((id, { req }) => {
		const user = users.find((user) => user.id === id);
		if (!user) {
			throw new Error('User not found');
		}

		req.user = user;
		return true;
	}),
	handleValidationErrors,
];