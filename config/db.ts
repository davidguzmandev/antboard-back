import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();
let prisma: PrismaClient;

declare global {
    var __prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.__prisma) {
        global.__prisma = new PrismaClient();
    }
    prisma = global.__prisma;
}

// Funcion de conexion con la DB postgresql con Prisma
const connectDB = async (): Promise<void> => {
    try {
        await prisma.$connect();
        console.log(`✅ Database connected successfully`);
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};

export default prisma;
export { connectDB };


/* CONFIGURACION CON MONGODB
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        console.error('mongoURI is not defined in the environment variables.');
        process.exit(1);
    }

    try{
        await mongoose.connect(mongoURI)
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
}

export default connectDB; */