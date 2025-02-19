const bcrypt = require('bcrypt');
const { fetchUserByEmail, fetchPasswordByEmail } = require('../models/userModel');

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

  // allow the user to login
  return res.json({ message: 'Login successful' });
};
