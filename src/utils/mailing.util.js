import { createTransport } from "nodemailer";
import _dirname from "../../utils.js"//si se necesita enviar archivo
import environment from "./env.util.js";
const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = environment

async function sendEmail(data) {
    try {
       
        //crear transporte
        const transport = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: { user: GOOGLE_EMAIL, pass: GOOGLE_PASSWORD }
        })
        //opcionalmente verificar el transporte
        await transport.verify();
        await transport.sendMail({
            from: `MATILDA <${GOOGLE_EMAIL}>`,
            to: data.to,
            subject: `USER ${data.email.toUpperCase()} REGISTERED!`,
            html: `
                <h1 style="color:red">WELCOME TO MATILDA</h1>
                <p>VERIFY CODE:${data.code}
                
            `

        })
    } catch (error) {
        throw error;
    }
}

export default sendEmail;