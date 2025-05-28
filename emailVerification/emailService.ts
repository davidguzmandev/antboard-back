import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app password
    }
});

export const sendActivationEmail = async (to: string, activationLink: string) => {
    await transporter.sendMail({
        from: `"No Reply" <${process.env.EMAIL_USER}>`, // Sender address
        to,
        subject: 'Activate your account',
        html: `
            <h1>Welcome to Ant LoadBoard</h1>
            <p>Thank you for signing up! Please click the link below to activate your account:</p>
            <a href="${activationLink}">Activate Account</a>
            <p>If you did not sign up, please ignore this email.</p>
        `,
    });
};