// Make the connction to the database
const sql = require('mssql');
let pool;

// Config for db connection
const config = {
    user: 'szadmin',
    password: 'password123!',
    server: 'kanbanboardsz.database.windows.net',
    database: 'kanban_board',
    options: {
        encrypt: true,
        trustServerCertificate: true 
    }
};

// Initialize database connection
const initializePool = async () => {
    if (!pool) {
        try {
            pool = await sql.connect(config);
            console.log("Connected to SQL Server");
        } catch (err) {
            console.error("Database connection failed: ", err);
            throw err; 
        }
    }
};

// make sure that db is connected to before querying
const getPool = async () => {
    if (!pool) await initializePool();
    return pool;
};

// call function to start the pool
initializePool();

// create a new notification and return its notification_id
const createNotification = async (userId, type, message) => {
    try {
        const db = await getPool();
        const result = await db.request()
            .input('userId', sql.Int, userId)
            .input('type', sql.NVarChar(50), type)
            .input('message', sql.NVarChar(255), message)
            .query(`
                INSERT INTO notifications (user_id, type, message)
                OUTPUT INSERTED.notification_id
                VALUES (@userId, @type, @message)
            `);
        // return the inserted notification's id
        return result.recordset[0].notification_id;
    } catch (err) {
        console.error("Error creating notification:", err);
        throw err;
    }
};

// fetch all notifications for a given user, ordered by created_at (newest first)
const fetchNotificationsByUser = async (userId) => {
    try {
        const db = await getPool();
        const result = await db.request()
            .input('userId', sql.Int, userId)
            .query(`
                SELECT * FROM notifications
                WHERE user_id = @userId
                ORDER BY created_at DESC
            `);
        return result.recordset;
    } catch (err) {
        console.error("Error fetching notifications for user:", err);
        throw err;
    }
};

// mark a notification as read based on its notification_id
const markNotificationAsRead = async (notificationId) => {
    try {
        const db = await getPool();
        const result = await db.request()
            .input('notificationId', sql.Int, notificationId)
            .query(`
                UPDATE notifications
                SET is_read = 1
                WHERE notification_id = @notificationId
            `);
        // returns the number of rows affected
        return result.rowsAffected[0];
    } catch (err) {
        console.error("Error marking notification as read:", err);
        throw err;
    }
};

const getUnreadCountByUser = async (userId) => {
    try {
      const db = await getPool();
      const result = await db.request()
        .input('userId', sql.Int, userId)
        .query(`
          SELECT COUNT(*) AS unreadCount
          FROM notifications
          WHERE user_id = @userId
            AND is_read = 0
        `);
      return result.recordset[0].unreadCount;
    } catch (err) {
      console.error('Error fetching unread notification count:', err);
      throw err;
    }
};

module.exports = {
    createNotification,
    fetchNotificationsByUser,
    markNotificationAsRead,
    getUnreadCountByUser
};
