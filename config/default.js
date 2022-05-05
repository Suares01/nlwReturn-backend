require('dotenv/config');

const { NODEMAILER_USER, NODEMAILER_PASS } = process.env;

module.exports = {
  App: {
    port: 3333,
    mailService: {
      nodemailer: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS,
      },
    },
  },
};
