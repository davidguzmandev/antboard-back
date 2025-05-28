import User from './userModel';

export const activateUser = async ( userId:string ): Promise<void> => {
    const user = await User.findById(userId);
    if(!user) {
        throw new Error('User not found');
    }

    if(user.isActive) {
        return; // User is already active
    }

    user.isActive = true;
    await user.save();
}