const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
  tls: { rejectUnauthorized: false },
});

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(
        `=== Le serveur est pret pour envoyé un message: ${success} ===`,
      );
});
const onSendingMSG = (request, response) => {
  console.log("email de l'expéditeur ", request.body.mailerState.contactEmail);

  let mailOptions = {
    from: `${request.body.mailerState.contactEmail}`,
    to: process.env.SMTP_EMAIL,
    subject: `Sujet du message : ${request.body.mailerState.sujet}`,
    text: `${request.body.mailerState.comments}`,
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log("error ", error);
      response.json({ status: "échec de l'envoi" });
    } else {
      console.log("Email envoyé avec success");

      response.json({ success: true, message: "Email envoyé" });
    }
  });
};

module.exports = onSendingMSG;
