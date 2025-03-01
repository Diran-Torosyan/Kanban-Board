const { fetchUserByName } = require("../models/userModel.js");

exports.searchUser = async (req, res) => {
    try {
        // get name that user is trying to search for and search db
        const name = req.query.name;
        const users = await fetchUserByName(name);
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users by name" });
    }
};