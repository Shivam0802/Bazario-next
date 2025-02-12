import nodemailer from "nodemailer";

export const sendEmail = async (mailOptions: any) => {
     const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
               user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASSWORD,
          },
     });  

     await transporter.sendMail(mailOptions);                                                                                          
};
