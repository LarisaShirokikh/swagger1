import nodemailer from "nodemailer";

export const emailAdapter = {

    async sendEmail(email: string, subject: string, massage: string) {
        let transporter = nodemailer.createTransport({
            service: "gmail",

            auth: {
                user: "svas2204@gmail.com", // generated ethereal user
                pass: "Idinafig1110-" // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: "Lora", // sender address
            to: email, // list of receivers
            subject: subject, // Subject line

            html: massage // html body
        });

        return info

    },



}