import { Request, Response } from 'express';
import { verifyActivationToken } from './tokenUtils';
import { activateUser } from '../users/userService';

export const handleVerifyEmail = async ( req: Request, res: Response ): Promise<void> => {
    try{
        const { token } =req.query;
        if (!token || typeof token !== 'string') {
            res.status(400).json({ message: "Invalid or missing token" });
            return
        }

        const { userId } = verifyActivationToken(token);
        await activateUser(userId);

        /* Esta parte de codigo se uso solo como test inicial, ahora con redirect no es necesario usarla
        res.status(200).json({ message: "Email verified successfully" }); */

        res.redirect(`${process.env.BACKEND_URL}:${process.env.PORT}/`);

    } catch ( error ) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
}