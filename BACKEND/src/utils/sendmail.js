import nodemailer from "nodemailer"
const sendVerificationEmail= async (email, token) => {
    const verifyUrl = `${process.env.FRONTEND_URL}/verify/${token}`;
    const mailConfigurations = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Email Verification",
        text: `Hi there, please verify your email by clicking the link below:
        ${verifyUrl}
        
        This link will expire in 1 hour.
        Thanks!`,
    };
 
    const transporter = nodemailer.createTransport({
        service:"gmail",
        port:587,
        logger:true,
        debugger:true,
        secureConnection:false,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls:{
            rejectUnauthorized:true
        }
    });

    await transporter.sendMail(mailConfigurations);
};

export default sendVerificationEmail