const nodemailer = require('nodemailer');
const crypto = require('crypto');
const fs = require("fs");

// Load JSON file
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const users = config.users;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'KanbanBoard490@gmail.com',
        pass: 'Comp490!',
    },
});

//this will generate the code to send to the email
function generateCode() {
    return crypto.randomInt(100000,999999);
}

//this will send the code to the email
function sendCodeEmail (email, Code) {
    const mailOptions = {
        from: 'KanbanBoard490@gmail.com',
        to: email,
        subject : 'Authentication Code',
        text: `Your authentication code is: ${Code}`,

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error sending code: ', error);
        } else {
            console.log('code sent: ', info.response);
        }
    });
}

const tempCodes = {};

// Export the functions and tempCodes object
module.exports = { generateCode, sendCodeEmail, tempCodes };