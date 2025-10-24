import 'dotenv/config';
import express from 'express';
import userRoutes from './routes/users.js';


const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.use('/users', userRoutes);

app.listen(port, () => {
	console.log(`Server running on port: http://localhost:${port}`)
})
