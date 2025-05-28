import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = "1h";

export const generateActivationToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyActivationToken = (token: string): { userId: string } => {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
}