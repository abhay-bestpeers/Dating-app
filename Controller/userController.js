const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};

const registerUser = async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      email,
      phone,
      techstack,
      age,
      gender,
      address,
    } = req.body;

    if (
      !name ||
      !username ||
      !password ||
      !email ||
      !phone ||
      !techstack ||
      !age ||
      !gender ||
      !address
    ) {
      return res.status(400).json("All fields are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      email,
      phone,
      techstack,
      age,
      gender,
      address,
    });
    
    return res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }

    const user = await User.findOne({ email });


    if (!user) {
      return res.status(400).json("User not found");
    }

    if(user.isdeltete === true){
      return res.status(400).json('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid password");
    }

    
    const token = generateToken(user._id);

    
    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "none",
      maxAge: 3600000,
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const logoutUser = async (req, res) => {
 await res.cookie("jwtToken", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: new Date(0),
  });

  res.json({
    message: "User Logged Out Successfully",
  });
};

module.exports = { registerUser, loginUser, logoutUser };
