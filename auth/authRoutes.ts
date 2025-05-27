import express from 'express';
import { signUpUser } from './authController'

export const router = express.Router();

router.post("/signup", signUpUser)