import { Request, Response } from 'express';
import { verifyActivationToken } from './tokenUtils';
import { activateUser } from '../users/userService';

export const handleVerifyEmail = async ( req: Request, res: Response ) => {
    try{
        const { token } =req.query;
        if (!token || typeof token !== 'string') {
            return res.status(400).json({ message: "Invalid or missing token" });
        }

        const { userId } = verifyActivationToken(token);
        await activateUser(userId);

        res.status(200).json({ message: "Email verified successfully" });

    } catch ( error ) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
}