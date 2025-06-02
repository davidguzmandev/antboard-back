import prisma from '../config/db';
import { Load } from '@prisma/client';

interface CreateLoadInput extends Omit<Load, 'id' | 'createdAt' | 'updatedAt'> {}

export const createLoad = async (data: CreateLoadInput) => {
    const newLoad = await prisma.load.create({
        data,
    });
    return newLoad;
}
