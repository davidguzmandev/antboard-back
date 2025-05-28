import express from 'express';
import { signUpUser } from './authController'
import { handleVerifyEmail } from '../emailVerification/emailController';

export const router = express.Router();

router.post("/signup", signUpUser);
router.get("/verify", handleVerifyEmail);

export default router;