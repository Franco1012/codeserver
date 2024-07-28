import { createTransport } from "nodemailer";
import _dirname from "../../utils.js"//si se necesita enviar archivo
import environment from "./env.util.js";
const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = environment
console.log(GOOGLE_EMAIL)
console.log(GOOGLE_PASSWORD)
async function sendEmail(data) {
    console.log("dataSend", data)
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
            to:data.to,
            subject:data.subject,
            html:data.html
        });
    } catch (error) {
        throw error;
    }
}

export default sendEmail;