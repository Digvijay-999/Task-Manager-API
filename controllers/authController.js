const User = require("../models/User");

const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please provide all fields"
        });
    }

    res.json({
        name,
        email,
        password
    });
};

module.exports = {
    registerUser
};