import { Router } from "express";
import { registerUser } from "../controllers/registerUserController";
import { loginUser } from "../controllers/loginController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
