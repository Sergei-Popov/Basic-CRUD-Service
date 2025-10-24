import { users } from "../routes/users.js";

export const validateParams = (req, res, next) => {
	const { id } = req.params;

	const user = users.find((user) => user.id === id)

	if (!user) return res.status(404).send('User not found');

	next();
};