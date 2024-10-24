const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "berrmedd@gmail.com",
    pass: "xhus urdt ybcc gpzx",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(userEmail,link) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"amazon" <amazon@amazon.com>', // sender address
    to: userEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1><a href="https://s1-final-project-front.vercel.app/validateUser/${link}"> validate your account</a></h1>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports=main