const { fetchTaskByUser, createTask, assignTask, fetchTaskByAdmin, deleteTask } = require('../models/taskModel.js');
const { fetchUserByUserId } = require('../models/userModel.js');
const { sendNotificationEmail, createTaskAssignedEmail } = require('./2faEmail.js');

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
    
    //get admin information
    const tempAdmin = await fetchUserByUserId(req.user.id);
    const admin = {
      name: tempAdmin.username,
      email: tempAdmin.email,
    };

    // assign the task
    const assignedUsers = req.body.assignedUsers;
    for(let i = 0; i < assignedUsers.length; i++) {
      let task_assigned = await assignTask(createdTask, assignedUsers[i]);
      let user = await fetchUserByUserId(assignedUsers[i]);
      sendNotificationEmail(user.email, `Task Alert: ${task.title} has been assigned to you`, createTaskAssignedEmail(user.username, task, admin));
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

exports.deleteTask = async (req, res) => {
  try {
    //get task id from request
    const taskId = req.body.taskId;
    await deleteTask(taskId);
    res.status(200).json({ message: 'Task deleted successfully'});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'deleting task error' });
  }
}