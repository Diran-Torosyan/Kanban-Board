const { fetchTaskById, updateTaskStatus } = require('../models/taskModel.js');
const { fetchUserByUserId } = require('../models/userModel.js');
const { sendNotificationEmail, createTaskProgressUpdateEmail } = require('./2faEmail.js');

exports.updateTask = async (req, res) => {
    try {
        const taskId = req.body.taskId;
        const newStatus = req.body.newStatus;
        const updatedTask = await updateTaskStatus(taskId, newStatus);

        // prevent non-admin users from setting the status to 'approved'
        if(newStatus.toLowerCase() === 'approved' && req.user.role.toLowerCase() !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized: You cannot approve tasks.' });
        }

        // send notification email
        const task = await fetchTaskById(taskId);
        const admin = await fetchUserByUserId(task.created_by);
        const user = await fetchUserByUserId(req.user.id);
        sendNotificationEmail(admin.email, `Task Alert: ${task.title} status has changed`, createTaskProgressUpdateEmail(admin.username, task, user.username));

        res.status(200).json({ message: 'Task status updated successfully', task: task });
    } catch (err) {
        console.log("error updating task: ", err);
        res.status(500).json({ message: 'Error updating task status' });
    }
};

exports.approveTask = async (req, res) => {
    try {
        // make sure the user has admin privileges before proceeding.
        if (!req.user || req.user.role.toLowerCase() !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Only admin users can approve tasks.' });
        }

        const taskId = req.body.taskId;
        const approvedTask = await updateTaskStatus(taskId, "approved");

        res.status(200).json({ message: 'Task approved' });
    } catch (err) {
        console.log("error approving task: ", err);
        res.status(500).json({ message: 'Error approving task' });
    }
};