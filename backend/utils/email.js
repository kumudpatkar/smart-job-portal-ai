import nodemailer from "nodemailer";


// Email transporter
const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

});



// Send Email Function

export const sendEmail = async (options) => {

    try {

        const mailOptions = {

            from: `"Smart Job Portal AI" <${process.env.EMAIL_USER}>`,

            to: options.email,

            subject: options.subject,

            html: options.message,

        };


        await transporter.sendMail(mailOptions);


        console.log("Email sent successfully");

    } catch(error) {

        console.log("Email Error:", error.message);

    }

};