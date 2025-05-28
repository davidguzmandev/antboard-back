import express, { Router } from 'express';
import { signUpUser } from './authController'
import { handleVerifyEmail } from '../emailVerification/emailController';

const router: Router = express.Router();

router.post("/signup", signUpUser);
router.get("/verify", handleVerifyEmail);

export default router;