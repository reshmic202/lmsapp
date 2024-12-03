import express from 'express';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import courseRoutes from './routes/courseRoute.js';
import notesRoutes from './routes/notesRoute.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.json({
        message: 'Welcome to the LMS API!'
    })
})

const connectDB=async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

connectDB();
// userRoute
app.use("/api/user",userRoutes)
// courseRoute
app.use("/api/course",courseRoutes)
app.use("/api/notes",notesRoutes)

app.listen(8080, ()=>{
    console.log('Server is running on port 6000');
})

export default app;
