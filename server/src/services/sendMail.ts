import nodemailer, { createTransport } from 'nodemailer'
import envConfig from '../config/config'
import StreamTransport from 'nodemailer/lib/stream-transport'

interface IData{
    to : string,
    subject : string,
    text : string
}

const sendmail = async(data : IData)=>{
const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : envConfig.email_send,
        pass : envConfig.password_email
    }
})
const mailOptions = {
    from : "	CSIT Association of Nepal - Pokhara <csitanpokharaofficial@gmail.com>",
    to : data.to,
    subject : data.subject, 
    text : data.text
}
try {
    await transporter.sendMail(mailOptions)
    
} catch (error) {
    console.log(error)
}

}
export default sendmail