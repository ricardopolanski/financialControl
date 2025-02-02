🚀 Step 1: Set Up the Project
1️⃣ Create the Frontend

npx create-vite@latest my-app --template react-ts
cd my-app
npm install

2️⃣ Create the Backend

mkdir server && cd server
npm init -y
npm install express cors dotenv jsonwebtoken bcryptjs mongoose cookie-parser
npm install --save-dev typescript ts-node @types/node @types/express @types/jsonwebtoken @types/bcryptjs @types/cookie-parser

📂 Folder Structure

📦 my-app
├── 📂 client (Frontend - React)
│   ├── 📂 src
│   │   ├── 📂 components
│   │   │   ├── 📜 LoginForm.tsx
│   │   ├── 📂 pages
│   │   │   ├── 📜 LoginPage.tsx
│   │   │   ├── 📜 DashboardPage.tsx
│   │   ├── 📂 routes
│   │   │   ├── 📜 ProtectedRoute.tsx
│   │   ├── 📜 App.tsx
│   │   ├── 📜 main.tsx
│   │   ├── 📜 types.ts
│   ├── 📜 package.json
│
├── 📂 server (Backend - Express)
│   ├── 📂 src
│   │   ├── 📂 controllers
│   │   │   ├── 📜 authController.ts
│   │   ├── 📂 routes
│   │   │   ├── 📜 authRoutes.ts
│   │   ├── 📂 middleware
│   │   │   ├── 📜 authMiddleware.ts
│   │   ├── 📂 models
│   │   │   ├── 📜 userModel.ts
│   │   ├── 📂 config
│   │   │   ├── 📜 db.ts
│   │   ├── 📜 server.ts
│   ├── 📜 package.json
│
├── 📜 README.md

🖥️ Backend - Express API
1️⃣ Configure TypeScript (server/tsconfig.json)

{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "module": "CommonJS",
    "target": "ES6",
    "strict": true
  }
}

2️⃣ Configure PostgreSQL Connection (server/src/config/db.ts)

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME = process.env.DB_NAME || "auth_db";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";
const DB_HOST = process.env.DB_HOST || "localhost";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false, // Set to true to see SQL queries
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("🔥 PostgreSQL Connected!");
    await sequelize.sync(); // Ensures tables are created
  } catch (error) {
    console.error("PostgreSQL Connection Error:", error);
    process.exit(1);
  }
};

export default sequelize;

3️⃣ User Model (server/src/models/userModel.ts)

import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const User = sequelize.define("User", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

export default User;

4️⃣ Authentication Controller (server/src/controllers/authController.ts)

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connectDB(); // Connect PostgreSQL

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));


5️⃣ Routes (server/src/routes/authRoutes.ts)

import express from "express";
import { login } from "../controllers/authController";

const router = express.Router();

router.post("/login", login);

export default router;

6️⃣ Middleware for Protected Routes (server/src/middleware/authMiddleware.ts)

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    (req as any).user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

7️⃣ Server Setup (server/src/server.ts)

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

🌍 Frontend - React App
1️⃣ Install Dependencies

cd client
npm install axios react-router-dom

2️⃣ Create Login Page (client/src/pages/LoginPage.tsx)

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { username, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;

3️⃣ Protected Route (client/src/routes/ProtectedRoute.tsx)

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;

4️⃣ App Routing (client/src/App.tsx)

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

🎯 Start the App

cd server && npm run dev  # Start Backend
cd client && npm run dev  # Start Frontend

Now visit http://localhost:5173 to test the login system! 🚀