const bcrypt = require("bcryptjs");
const User = require("../models/User");




const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please provide all fields"
        });
    }
    const existingUser = await User.findOne({
    email
    });
    console.log("Existing User:", existingUser);
   
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =
    await bcrypt.hash(password, salt);
    
    const user = await User.create({
    name,
    email,
    password: hashedPassword
});

res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email
});
};

const loginUser = async (req, res) => {

    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({
            message: "Please provide all fields"
        });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
        message: "User not found"
    });
}
    const isMatch = await bcrypt.compare(
    password,
    user.password
);
    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }
    
    res.json({
        email,
        password
    });

};

module.exports = {
    registerUser,
    loginUser
};