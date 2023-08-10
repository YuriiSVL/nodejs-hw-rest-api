const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 2525, 465-захищений
  secure: true,
  auth: {
    user: "giksigrek@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "giksigrek@gmail.com",
//   from: "giksigrek@meta.ua",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost:3000</p>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

const sendEmail = async (data) => {
  console.log(META_PASSWORD);
  console.log(transport);
  const email = { ...data, from: "giksigrek@meta.ua" };
  await transport.sendMail(email);
};

module.exports = sendEmail;
