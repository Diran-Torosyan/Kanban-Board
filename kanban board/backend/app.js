const express = require("express");
const app = express();

// make json files into js objects (req.body)
app.use(express.json());

// put all the authentication routes under /api
const authRoutes = require('./routes/auth.js');
app.use('/api', authRoutes);

// put all the task routes under /api
const taskRoutes = require('./routes/task.js');
app.use('/api', taskRoutes);

// put all user routes under /api
const userRoutes = require('./routes/users.js');
app.use('/api', userRoutes);

// get the app running 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });