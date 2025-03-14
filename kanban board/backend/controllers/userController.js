const { fetchUserByName, fetchAllUsers } = require("../models/userModel.js");

exports.searchUser = async (req, res) => {
  try {
    const name = req.query.name?.trim();  // Only look for the name query if it's passed

    if (name) {
      // If there is a search term, find users by name
      const users = await fetchUserByName(name);
      return res.json({ users });
    }

    // If no name query is provided, fetch all users
    const users = await fetchAllUsers();
    res.json({ users });

  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};