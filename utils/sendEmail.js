const nodemailer= require('nodemailer')
require('dotenv').config()

module.exports = async (email,subject,text) =>{
    console.log("Inside send email.js");
try {
    

    const transporter = nodemailer.createTransport({
        host:process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.PORT),
        secure: Boolean(process.env.SECURE),
        auth:{
            user:process.env.USER,
            pass:process.env.PASS
        }
    })

    await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text
    })

    console.log("Email sent successfully");
} catch (error) {
    console.log("Email not sent");
    console.log(error.message);
}
}