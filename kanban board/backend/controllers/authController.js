const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { fetchUserByEmail, fetchPasswordByEmail } = require('../models/userModel');
const { generateCode, sendCodeEmail, tempCodes } = require('./2faEmail.js');

// login endpoint for validating credentials
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // fetch the user using email
  const user = await fetchUserByEmail(email);
  // handle if user email does not exist
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // fetch the stored password hash from the db
  const storedPasswordResult = await fetchPasswordByEmail(email);
  // check if a password has been returned
  if (!storedPasswordResult || storedPasswordResult.length === 0) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // convert storedPassword to a string
  let storedPassword = String(storedPasswordResult[0].password);

  // verify the provided password against the stored hashed password
  const passwordMatches = await bcrypt.compare(password, storedPassword);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // send 2fa code email
  const code = generateCode();
  tempCodes[email] = code; // store the code
  sendCodeEmail(email, code);

  return res.json({ message: 'login successful' });
};

// Example verification endpoint (can be placed in authController or its own route file)
exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;
  
  // check that user has a code generated and that it matches
  if (tempCodes[email] && parseInt(code, 10) === tempCodes[email]) {
    delete tempCodes[email];  // delete code from temp storage

    // fetch the user using email
    const user = await fetchUserByEmail(email);
    // generate jws token
    // create a payload for the token
    const payload = {
      id: user.user_id,
      role: user.role,
    };

    // sign the token with the secret key
    const token = jwt.sign(payload, "KanbanSecretKey", {
      expiresIn: '2h', 
    });

    return res.json({ message: '2FA code correct', token });
  } else {
    return res.status(400).json({ message: 'Invalid 2FA code' });
  }
};