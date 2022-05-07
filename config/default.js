require('dotenv/config');

const { NODEMAILER_USER, NODEMAILER_PASS } = process.env;

module.exports = {
  App: {
    mailService: {
      nodemailer: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS,
      },
    },
  },
};
