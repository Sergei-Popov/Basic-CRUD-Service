import { users } from "../data/db.js";
import { v4 as uuid } from 'uuid';

export const getAllUsers = (req, res) => res.send(users);

export const createUser = (req, res) => {
	const user = req.body;

	users.push({
		...user,
		id: uuid()
	});

	res.send(`${user.first_name} has been added to the Database`);
};

export const getUserById = (req, res) => {
	const { id } = req.params;

	const foundUser = users.find((user) => user.id === id)

	res.send(foundUser)
}

export const deleteUser = (req, res) => {
	const { id } = req.params;

	users = users.filter((user) => user.id !== id)

	res.send(`${id} deleted successfully from database`);
}

export const updateUser = (req, res) => {
	const { id } = req.params;

	const { first_name, last_name, email} = req.body;

	const user = users.find((user) => user.id === id);

	if(first_name) user.first_name = first_name;
	if(last_name) user.last_name = last_name;
	if(email) user.email = email;

	res.send(`User with the ${id} has been updated`)
}