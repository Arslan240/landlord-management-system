const { sendEmail } = require("./sendEmail")

const sendVerificationEmail = async ({ email, verificationToken, origin }) => {
  sendEmail({
    to: email,
    subject: "Verify your email",
    // this html should send the client to frontend verify email page, where a form will be shown with values and a button to verify email, when email is verified user is redirected to login page. if not then show button to resend email.
    // for now just send the client to verify email at get request.
    html: `<h2>Verify your email: ${email}</h2> 
      <a href="http:localhost:4000/api/v1/auth/verify-email?email=${email}&verificationToken=${verificationToken}">Verify your email</a>
    `,
  })
}

module.exports = sendVerificationEmail
