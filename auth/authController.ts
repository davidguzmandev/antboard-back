import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import User, { Role } from "../users/userModel";
import { generateActivationToken } from "../emailVerification/tokenUtils";
import { sendActivationEmail } from "../emailVerification/emailService";

//Esquema ZOD
const signUpSchema = z.object({
    role: z.nativeEnum(Role),
    name: z.string().min(1, "Name is required"),
    subname: z.string().min(1, "Subname is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    companyName: z.string().optional(),
    phone:z.string().optional(),
});

//Tipar el body valido
type SignUpInput = z.infer<typeof signUpSchema>;

export const signUpUser = async (req: Request, res: Response): Promise<void> => {
    try {
        //Validar con zod
        const parsed = signUpSchema.safeParse(req.body)
        if (!parsed.success) {
            const errors = parsed.error.flatten().fieldErrors;
            res.status(400).json({ error: "Validation failed", details: errors });
            return
        }
        const { role, name, subname, email, password, companyName, phone }: SignUpInput = parsed.data;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if ( existingUser ) {
            res.status(409).json({ error: "User already exists" });
            return
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //Crear el usuario
        const newUser = new User({
            role,
            name,
            subname,
            email,
            password: hashedPassword,
            companyName,
            phone,
            isActive: false, // Por defecto, el usuario está inactivo, activar con NODEMAILER
        })

        await newUser.save();

        const token = generateActivationToken(newUser._id.toString());
        const activationLink = `${process.env.BACKEND_URL}:${process.env.PORT}/auth/verify?token=${token}`;
        await sendActivationEmail(newUser.email, activationLink);

        res.status(201).json({
            message: "User created successfully. Please check your email to activate your account.",
            user: {
                name: newUser.name,
                subname: newUser.subname,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.log("Error in Sign Up: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
