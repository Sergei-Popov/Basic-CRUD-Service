import 'dotenv/config';
import express from 'express';
import userRoutes from './routes/users.js';


const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json());

app.use('/users', userRoutes);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
	console.log(`Server running on port: http://localhost:${PORT}`)
})
