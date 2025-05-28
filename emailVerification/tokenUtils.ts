import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    // Si no está definido, lanza un error crítico.
    // Esto asegura que TypeScript sepa que JWT_SECRET es un string de aquí en adelante.
    throw new Error('FATAL ERROR: JWT_SECRET is not defined in environment variables.');
}

const EXPIRES_IN = "1h";

export const generateActivationToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyActivationToken = (token: string): { userId: string } => {
    try {
        // Ahora TypeScript sabe que JWT_SECRET es un string
        // Y la aserción de tipo `as { userId: string }` es correcta para el payload.
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        return decoded;
    } catch (error) {
        // jsonwebtoken.verify lanzará un error si el token es inválido o ha expirado.
        // Captura ese error y puedes relanzar uno más específico o genérico.
        // Para el usuario final, no querrás exponer el detalle técnico del error.
        console.error("Token verification failed:", error); // Log para depuración
        throw new Error("Invalid or expired token."); // Mensaje para el cliente
    }
}