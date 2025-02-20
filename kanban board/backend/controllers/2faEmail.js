const nodemailer = require('nodemailer');
const crypto = require('crypto');
const fs = require("fs");

// Load JSON file
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const users = config.users;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'where the email would go when we query',
        pass: 'the password for the account',
    },
});

//this will generate the code to send to the email
function generateCode() {
    return crypto.randomInt(100000,999999);
}

//this will send the code to the email
function sendCodeEmail (email, Code) {
    const mailOptions = {
        from: ' which email we will send from',
        to: 'the email we are sending to',
        subject : 'Authentication Code',
        text: ' the message that will actually be in the email, and put the code in here',
    };

    transporter,sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error sending code: ', error);
        } else {
            console.log('code sent: ', info.response);
        }
    });
}

// route to request the code
app.post('/request-code', (req,res) => {
    const email = req.body.email;
    const code = generateCode();

    sendCodeEmail(email, code);

    // need to find way to store the code temporarily

    res.send('code sent to your email');

});


//route to verify the code

app.post('/verify code', (req,res) => {
    const {email, code} = req.body;

    if(users[email] && users[email].code === parseInt(code)) {
        res.send('code verified successfully');
    } else {
        res.status(400).send('invalid code');

    }
});