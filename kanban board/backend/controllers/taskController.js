const { fetchTaskByUser, createTask, assignTask, fetchTaskByAdmin } = require('../models/taskModel.js');

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

exports.makeTask = async (req, res) => {
  try {
    // create the task
    const task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      created_by: req.user.id,
    }
    const createdTask = await createTask(task);
    
    // assign the task
    const assignedUsers = req.body.assignedUsers;
    for(let i = 0; i < assignedUsers.length; i++) {
      let task_assigned = await assignTask(createdTask, assignedUsers[i]);
    }

    res.status(201).json({ message: 'Task created and assigned successfully', task: createdTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error making task '});
  }
};

exports.getAdminTasks = async (req, res) => {
  try {
    // get admin id from the JWS token
    const userId = req.user.id; 
    // call the db to get the tasks for the admin
    const tasks = await fetchTaskByAdmin(userId);
    res.json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching tasks for admin' });
  }
};