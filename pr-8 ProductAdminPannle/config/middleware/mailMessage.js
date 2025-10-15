const nodemailer = require("nodemailer")
module.exports.sendEmail = async (msg) => {
  const transporter = nodemailer.createTransport({
    port: 587,
    service: "gmail",
    secure: false,
    auth: {
      user: "budheliyasmit@gmail.com",
      pass: "kuhcvmrpxstuvusb",
    },
  });
  let res = await transporter.sendMail(msg);
  return res;
}