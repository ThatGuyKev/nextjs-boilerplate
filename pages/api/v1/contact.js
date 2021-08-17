import nodemailer from 'nodemailer';

const mailer = nodemailer.createTransport({
    host: '',
    port: 465,
    auth: {
        user: "username",
        pass: "password",
    },
});

export default async (req, res) => {
    const { name, email, number, subject, text } = req.body;

    const data = {
        to: '',
        from: email,
        subject: 'Website Contact',
        text: text,
        html: `
            <b>From:</b> ${name} <br /> 
            <b>Number:</b> ${number} <br /> 
            <b>Subject:</b> ${subject} <br /> 
            <b>Text:</b> ${text} 
        `
    };

    try {
        const response = await mailer.sendMail(data);
        console.log(response)
        res.status(200).send("Email sent successfully")
    } catch (error) {
        console.log(error);
        res.status(500).send("Error processing charge");
    }
}
