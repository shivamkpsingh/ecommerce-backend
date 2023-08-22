import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';

//configure env
dotenv.config();

connectDB();

const app = express();
//add middleware

app.use(express.json());
app.use(morgan('dev'));

//Routing
app.use('/api/v1/auth',authRouter);

//rest object
app.get('/', (req, res) =>{
    res.send('<h1>HELLO APPS</h1>')
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is runnings on port ${PORT}.`);
})