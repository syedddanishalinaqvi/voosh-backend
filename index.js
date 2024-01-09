import express from 'express'
import cors from 'cors'
import { connectToDb } from './database.js';

//Connect to MongoDB
connectToDb();

const PORT=8000;
const app=express();

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.json());

//routes
import UserRoutes from './routes/user.route.js'
import OrderRoutes from './routes/order.route.js'

app.use("/api/user",UserRoutes);
app.use("/api/order",OrderRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on this ${PORT}`);
})