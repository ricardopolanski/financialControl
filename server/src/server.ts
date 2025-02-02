import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRouter from "./routes/authRouter";
import sequelize from "./config/db";

dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Enables CORS
app.use(express.json()); // Parses JSON body
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Connect to database
connectDB();

// Sync all models (this will drop all tables and recreate them)
sequelize.sync({ force: true }).then(() => {
  console.log("All tables have been dropped and recreated.");
}).catch((error) => {
  console.error("Error syncing the database:", error);
});

// Register routes
app.use("/api/auth", authRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
