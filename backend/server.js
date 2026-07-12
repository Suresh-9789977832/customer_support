import express from "express";
import cors from "cors"
import connectDB from './db.js'
import uploadRoutes from './routes/uploadRoutes.js'
import authRoutes from './routes/authRoutes.js'


const app = express();

app.use(cors())
app.use(express.json());

app.use("/api", uploadRoutes);
app.use('/auth', authRoutes)

const PORT = 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});


