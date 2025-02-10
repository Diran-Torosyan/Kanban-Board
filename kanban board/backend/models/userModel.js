// Make the connction to the database
const sql = require('mssql');
let pool;

// Import bcrypt for hashing passwords
const bcrypt = require('bcrypt'); 

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

// Call function to start the pool
initializePool();

// Add a user
const addUser = async (username, email, password, role, department) => {
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const db = await getPool();
      const result = await db.request()
          .input("username", sql.NVarChar, username)
          .input("email", sql.NVarChar, email)
          .input("password", sql.NVarChar, hashedPassword)
          .input("role", sql.NVarChar, role)
          .input("department", sql.NVarChar, department)
          .query(`
              INSERT INTO [user] (username, email, password, role, department)
              OUTPUT INSERTED.user_id
              VALUES (@username, @email, @password, @role, @department)
          `);
      return result.recordset[0].user_id;
  } catch (err) {
      console.error("Error creating user:", err);
      throw err;
  }
};

// get the user from the db by user Id
const fetchUserByUserId = async (userId) => {
    try {
      const db = await getPool();
      const result = await db.request()
            .input("user_id", sql.Int, userId)
            .query("SELECT * FROM [user] WHERE user_id = @user_id");
        return result.recordset[0];
    } catch (err) {
        console.error("Error fetching task: ", err);
        throw err; 
    }
};

// get the username from the db by email
const fetchUserByEmail = async (email) => {
  try {
    const db = await getPool();
    const result = await db.request()
          .input("email", sql.NVarChar, email)
          .query("SELECT * FROM [user] WHERE email = @email");
      return result.recordset[0];
  } catch (err) {
      console.error("Error fetching task: ", err);
      throw err; 
  }
};

// get the username from the db by email
const fetchUsernameByEmail = async (email) => {
  try {
    const db = await getPool();
    const result = await db.request()
          .input("email", sql.NVarChar, email)
          .query("SELECT username FROM [user] WHERE email = @email");
      return result.recordset[0];
  } catch (err) {
      console.error("Error fetching task: ", err);
      throw err; 
  }
};

// Get the email that is assigned to the user
const fetchEmailByUserId = async (userId) => {
    try {
      const db = await getPool();
      const result = await db.request()
            .input("userId", sql.Int, userId)
            .query("SELECT email FROM [user] WHERE user_id = @userId");
        return result.recordset[0];
    } catch(err) {
        console.error("Error fetching task: ", err);
        throw err; 
    }
};

// Get the password of the user by their email
const fetchPasswordByEmail = async (email) => {
    try {
      const db = await getPool();
      const result = await db.request()
            .input("email", sql.NVarChar, email)
            .query("SELECT password FROM [user] WHERE email = @email");
        return result.recordset;
    } catch(err) {
        console.error("Error fetching task: ", err);
        throw err; 
    }
};

// Get the password of the user by id
const fetchPasswordByUserId = async (userId) => {
  try {
    const db = await getPool();
    const result = await db.request()
          .input("userId", sql.Int, userId)
          .query("SELECT password FROM [user] WHERE user_id = @userId");
      return result.recordset;
  } catch(err) {
      console.error("Error fetching task: ", err);
      throw err; 
  }
};

// Get the password of the user by id
const fetchPasswordByUsername = async (username) => {
  try {
    const db = await getPool();
    const result = await db.request()
          .input("username", sql.NVarChar, username)
          .query("SELECT password FROM [user] WHERE username = @username");
      return result.recordset;
  } catch(err) {
      console.error("Error fetching task: ", err);
      throw err; 
  }
};

// Get the userID of the user by email
const fetchUserID = async (email) => {
    try {

      const db = await getPool();
      const result = await db.request()
          .input("email", sql.NVarChar, email)
          .query("SELECT user_id FROM [user] WHERE email = @email");
      return result.recordset;
    } catch(err) {
        console.error("Error fetching task: ", err);
        throw err; 
    }
};
 

//update email
const updateEmail = async (userId, newEmail) => {
    try {
      const db = await getPool();
      const result = await db.request()
          .input("user_id", sql.Int, userId)
          .input("email", sql.NVarChar, newEmail)
          .query(`
              UPDATE [user]
              SET email = @email
              WHERE user_id = @user_id
          `);
      return result.rowsAffected[0] > 0;
    } catch (err) {
      console.log("error updating email: ", err);
    }
};


//update password
const updatePassword = async (userId, newPassword) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const db = await getPool();
    const result = await db.request()
        .input("userId", sql.Int, userId)
        .input("hashedPassword", sql.NVarChar, hashedPassword)
        .query("UPDATE [user] SET password = @hashedPassword WHERE user_id = @userId");
    
    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.log("error updating password: ", err);
  }
};

// update the role
const updateRole = async (userId, newRole) => {
  /*
  const validRoles = ["admin", "user"];
  if (!validRoles.includes(newRole)) {
      console.error("Invalid role:", newRole);
      return false;
  }
  */

  try {
      const db = await getPool();
      const result = await db.request()
          .input("user_id", sql.Int, userId)
          .input("newRole", sql.NVarChar, newRole)
          .query("UPDATE [user] SET role = @newRole WHERE user_id = @user_id");

      return result.rowsAffected[0] > 0;
  } catch (err) {
      console.error("Error updating role:", err);
      throw err;
  }
};

//update department
const updateDepartment = async (userId, newDepartment) => {
    try {
        const db = await getPool();
        const result = await db.request()
            .input("user_id", sql.Int, userId)
            .input("department", sql.NVarChar, newDepartment)
            .query("UPDATE [user] SET department = @department WHERE user_id = @user_id");
        
          return result.rowsAffected[0] > 0;
    } catch (err) {
      console.log("error updating department: ", err);
    }
};

// remove a user
const deleteUser = async (userId) => {
  try {
      const db = await getPool();
      const result = await db.request()
          .input("userId", sql.Int, userId)
          .query("DELETE FROM [user] WHERE user_id = @userId");

      return result.rowsAffected[0] > 0;
  } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
  }
};

// Export all db queries for task table
module.exports = {
    addUser,
    fetchUserID,
    updateEmail,
    updatePassword,
    updateDepartment,
    updateRole,
    deleteUser,
    fetchPasswordByUserId,
    fetchPasswordByEmail,
    fetchEmailByUserId,
    fetchUsernameByEmail,
    fetchUserByEmail,
    fetchUserByUserId,
    fetchPasswordByUsername,
};