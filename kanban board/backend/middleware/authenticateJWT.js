const jwt = require('jsonwebtoken');

// function to checks to see if a valid token is provided to access the route
exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check if there is a token 
  if (authHeader) {
    // header is in the format "Bearer tokenString" (get tokenString)
    const token = authHeader.split(' ')[1];

    //check if token is valid
    jwt.verify(token,"KanbanSecretKey", (err, user) => {
      if (err) {
        return res.sendStatus(403); // handle expired or invalid token
      }

      // send the user information to the route
      req.user = user;
      next();
    });

  } else {
    res.sendStatus(401); // unauthorized if there is no token
  }
};
