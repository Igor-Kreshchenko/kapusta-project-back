const sgMail = require("@sendgrid/mail");
const { InternalServerError } = require("http-errors");

const { SENDGRID_API } = process.env;
sgMail.setApiKey(SENDGRID_API);

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: "kapusta.info.send@gmail.com" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = sendMail;
