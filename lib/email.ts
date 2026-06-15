import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_User,
    pass: process.env.SMTP_Pass,
  },
})

export async function sendEmail(
  email: string,
  subject: string,
  text: string,
  html?: string
) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject,
    text,
    html,
  })
}
