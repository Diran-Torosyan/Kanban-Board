const express = require("express");
const app = express();

// make json files into js objects (req.body)
app.use(express.json());

// put all the authentication routes under /api
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// get the app running 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });