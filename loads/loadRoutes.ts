import express, { Router } from 'express';
import { postLoad } from './loadController';
const router: Router = express.Router();

router.post('/load', postLoad);

export default router;