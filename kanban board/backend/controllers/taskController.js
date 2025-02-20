const { fetchTaskByUser } = require('../models/tasksModel.js');

exports.getUserTasks = async (req, res) => {
  try {
    // get user id from the JWS token
    const userId = req.user.id; 
    // call the db to get the tasks for the user
    const tasks = await fetchTaskByUser(userId);
    res.json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};
