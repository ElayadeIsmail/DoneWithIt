import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, url: string) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'mghaj4r5vs54b3mp@ethereal.email',
      pass: 'rwY9bbAXbqfTeP4JUT',
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject: 'Confirm Email ✔', // Subject line // plain text body
    html: `<a href=${url}>Confirm Email</a>`, // html body
  });

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
