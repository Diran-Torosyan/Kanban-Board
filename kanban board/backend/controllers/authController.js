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

  console.log(user);

  // fetch the stored password hash from the db
  const storedPasswordResult = await fetchPasswordByEmail(email);
  console.log(storedPasswordResult);
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

  console.log(user.role);

  // allow user to log in (specifify if employee or admin)
  if(user.role === "admin") {
    return res.json({ message: 'Admin login successful' });
  }

  return res.json({ message: 'Employee login successful' });
};
