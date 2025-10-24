export const validateBody = (req, res, next) => {

	if (req.method === 'PATCH') {
		if (!req.body?.first_name && !req.body?.last_name && !req.body?.email) {
			return res.status(400).send('first_name, last_name, or email are required');
		}
	}
	else if (req.method === 'POST') {
		if (!req.body?.first_name || !req.body?.last_name || !req.body?.email) {
			return res.status(400).send('first_name, last_name, and email are required');
		}
	}

	next();
};