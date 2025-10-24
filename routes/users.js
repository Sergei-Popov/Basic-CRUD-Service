import express from 'express';
import { v4 as uuid } from 'uuid';

import { validateBody, validateParams } from '../middlewares/index.js';

const router = express.Router();

// Mock database
export let users = [
	{
		first_name: 'John',
		last_name: 'Doe',
		email: 'johndoe@example.com',
		id: uuid()
	},
	{
		first_name: 'Alice',
		last_name: 'Smith',
		email: 'alicesmith@example.com',
		id: uuid()
	},
];

// Getting the list of users from the mock database
router.get('/', (req, res) => {
	res.send(users);
})

// Adding users to our mock database
router.post('/', validateBody, (req, res) => {
	const user = req.body;

	users.push({
		...user,
		id: uuid()
	});

	res.send(`${user.first_name} has been added to the Database`);
})

router.get('/:id', validateParams, (req, res) => {
	const { id } = req.params;

	const foundUser = users.find((user) => user.id === id)

	res.send(foundUser)
});

router.delete('/:id', validateParams, (req, res) => {
	const { id } = req.params;

	users = users.filter((user) => user.id !== id)

	res.send(`${id} deleted successfully from database`);
});

router.patch('/:id', validateParams, validateBody, (req, res) => {
	const { id } = req.params;

	const { first_name, last_name, email} = req.body;

	const user = users.find((user) => user.id === id);

	if(first_name) user.first_name = first_name;
	if(last_name) user.last_name = last_name;
	if(email) user.email = email;

	res.send(`User with the ${id} has been updated`)

});

export default router