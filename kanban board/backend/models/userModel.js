// Make the connction to the database
const sql = require('mssql');
let pool;
// for creating random user ID's
const { v4: uuidv4 } = require('uuid');

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
    try {
        pool = await sql.connect(config);
        console.log("Connected to SQL Server");
    } catch (err) {
        console.error("Database connection failed: ", err);
        throw err; 
    }
};

// Call function to start the pool
initializePool();

// get the username from the db
const fetchUsername = async (username) => {
    try {
        const result = await pool.request()
            .input("username", sql.Int, username)
            .query("SELECT * FROM user WHERE username = @username");
        return result.recordset[0];
    } catch (err) {
        console.error("Error fetching task: ", err);
        throw err; 
    }
}

// Get the email that is assigned to the user
const fetchEmail = async (email) => {
    try {
        const result = await pool.request()
            .input("email", sql.Int, email)
            .query("SELECT * FROM user WHERE email = @email");
        return result.recordset[0];
    } catch(err) {
        console.error("Error fetching task: ", err);
        throw err; 
    }
}

// Get the password of the user
const fetchPassword = async (password) => {
    try {
        const result = await pool.request()
            .input("password", sql.Int, password)
            .query("SELECT * FROM user WHERE password = @password");
        return result.recordset;
    } catch(err) {
        console.error("Error fetching task: ", err);
        throw err; 
    }
}
// Get the userID of the user
const fetchuserID = async (userid) => {
    try {
        const result = await pool.request()
            .input("userid", sql.Int, userid)
            .query("SELECT * FROM user WHERE userid = @user_id");
        return result.recordset;
    } catch(err) {
        console.error("Error fetching task: ", err);
        throw err; 
    }
}

// Create userID
async function createUniqueUserID() {
    let userID;
    let isUnique = false;
  
    while (!isUnique) {
      // Generate a random userID (e.g., using UUID)
      userID = uuidv4();
  
      // Check if the userID already exists in the database
      const query = `SELECT COUNT(*) AS count FROM user WHERE userID = user_id`;
      isUnique = await new Promise((resolve, reject) => {
        db.query(query, [userID], (err, results) => {
          if (err) reject(err);
          resolve(results[0].count === 0);
        });
      });
    }
  
    // Insert the unique userID into the database
    const insertQuery = `INSERT INTO user (userID) VALUES (userID)`;
    db.query(insertQuery, [userID], (err, results) => {
      if (err) throw err;
      console.log(`New userID created: ${userID}`);
    });
  
    return userID;
}
 

//update email
function updateEmail(userId, newEmail) {
    // SQL query to update the email for a specific user
    const query = `UPDATE user SET email = email WHERE id = user_id`;
  
    // Execute the query with parameterized values
    db.query(query, [newEmail, userId], (err, results) => {
      if (err) {
        console.error('Error updating email:', err);
        return;
      }
      if (results.affectedRows > 0) {
        console.log(`Email updated successfully for user ID: ${userId}`);
      } else {
        console.log(`No user found with ID: ${userId}`);
      }
    });
}


//update password
async function updatePassword(userId, newPassword) {
    try {
      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      // SQL query to update the password for a specific user
      const query = `UPDATE user SET password = password WHERE id = user_id`;
  
      // Execute the query with parameterized values
      db.query(query, [hashedPassword, userId], (err, results) => {
        if (err) {
          console.error('Error updating password:', err);
          return;
        }
        if (results.affectedRows > 0) {
          console.log(`Password updated successfully for user ID: ${userId}`);
        } else {
          console.log(`No user found with ID: ${userId}`);
        }
      });
    } catch (error) {
      console.error('Error hashing password:', error);
    }
}

//update role
function updateRole(userId, newRole) {
    // Validate the new role (example: check if it's 'admin' or 'user')
    const validRoles = []; // Define valid roles
    if (!validRoles.includes(newRole)) {
      console.error('Invalid role:', newRole);
      return;
    }
  
    // SQL query to update the role for a specific user
    const query = `UPDATE user SET role = role WHERE id = user_id`;
  
    // Execute the query with parameterized values
    db.query(query, [newRole, userId], (err, results) => {
      if (err) {
        console.error('Error updating role:', err);
        return;
      }
      if (results.affectedRows > 0) {
        console.log(`Role updated successfully for user ID: ${userId}`);
      } else {
        console.log(`No user found with ID: ${userId}`);
      }
    });
}

//update department
function updateDepartment(userId, newDepartment) {
    // SQL query to update the department for a specific user
    const query = `UPDATE user SET department = department WHERE id = user_id`;
  
    // Execute the query with parameterized values
    db.query(query, [newDepartment, userId], (err, results) => {
      if (err) {
        console.error('Error updating department:', err);
        return;
      }
      if (results.affectedRows > 0) {
        console.log(`Department updated successfully for user ID: ${userId}`);
      } else {
        console.log(`No user found with ID: ${userId}`);
      }
    });
}




// Export all db queries for task table
module.exports = {
    fetchEmail,
    fetchPassword,
    fetchUsername,
    fetchuserID,
    createUniqueUserID,
    updateEmail,
    updatePassword,
    updateDepartment,
    updateRole,
};