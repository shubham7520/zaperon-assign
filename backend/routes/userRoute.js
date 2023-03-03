import express from "express";
import { Register, Login, Home } from "../controllers/userController.js";
import { isAuthenticatesUser } from "../middleware/auth.js";

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/home', isAuthenticatesUser, Home);


export default router;

