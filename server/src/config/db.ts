import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME = process.env.DB_NAME || "auth_db";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = parseInt(process.env.DB_PORT || "5432");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  port: DB_PORT,
  logging: false, // Set to true for debugging SQL queries
});

// Function to connect and sync database
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("🔥 Database connected successfully");

    // Sync database (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log("✅ Tables created (if not exists)");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

export default sequelize;
