const nodemailer = require('nodemailer');
const crypto = require('crypto');
const fs = require("fs");

// Load JSON file
//const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
//const users = config.users;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kanbanboard491@gmail.com',
        pass: 'xahp yfgz dfxa eisz',
    },
});

//this will generate the code to send to the email
function generateCode() {
    return crypto.randomInt(100000,999999);
}

//this will send the code to the email
function sendCodeEmail (email, Code) {
    const mailOptions = {
        from: 'kanbanboard491@gmail.com',
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

//this is a more general function to handle sending any kind of email
function sendNotificationEmail (userEmail, subject, emailContent) {
    const mailOptions = {
        from: 'kanbanboard491@gmail.com',
        to: userEmail,
        subject : subject,
        text: emailContent,

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error sending email: ', error);
        } else {
            console.log('email sent: ', info.response);
        }
    });
};

function createTaskAssignedEmail(username, task, admin) {
    return `
  Hello ${username},
  
  You have been assigned a new task in CSUN's Kanban Board.
  
  Task Details:
  -----------------------
  Title: ${task.title}
  Description: ${task.description}
  Due Date: ${task.due_date}
  Assigned By: ${admin.name} (${admin.email})
  
  Please log in to your account to view more details and update the task status as needed.
  
  `;
};

const createTaskProgressUpdateEmail = (adminName, task, updatedBy) => {
    return `
  Hello ${adminName},
  
  The task "${task.title}" has been updated by ${updatedBy} with new progress.
  
  Task Details:
  -----------------------
  Title: ${task.title}
  Description: ${task.description}
  Due Date: ${task.due_date}
  
  Please log in to the Kanban Board application to review the update and take any necessary actions.
  
    `;
  };

const tempCodes = {};

// Export the functions and tempCodes object
module.exports = { generateCode, sendCodeEmail, sendNotificationEmail, tempCodes, createTaskAssignedEmail, createTaskProgressUpdateEmail };