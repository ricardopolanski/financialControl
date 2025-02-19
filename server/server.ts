import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRouter from "./routes/authRouter";
import sequelize from "./config/db";
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Enables CORS
app.use(express.json()); // Parses JSON body
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Connect to database
connectDB();

// Register routes
app.use("/api/auth", authRouter);

app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend Service Running on Port ${PORT}`));
