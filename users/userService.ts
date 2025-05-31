import prisma from "../config/db";

export const activateUser = async (userId: string): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isActive) {
      return; // User is already active
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: true,
      },
    });
  } catch (error) {
    console.error("Error activating user:", error);
    throw error;
  }
};
