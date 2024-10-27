const { nodemailerConfig } = require("./nodemailerConfig")
const nodemailer = require("nodemailer")

const sendEmail = async ({ to, subject, html }) => {
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport(nodemailerConfig)

  const info = await transporter.sendMail({
    from: '"Landlord Management System 👻" <maddison53@ethereal.email>', // sender address
    to, // list
    subject,
    html,
  })

  console.log("Email sent successfully")
}

module.exports = {
  sendEmail,
}
