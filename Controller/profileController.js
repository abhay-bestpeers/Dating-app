const moongose = require("mongoose")
const user = require("../Model/userModel")

const getUser = async(req,res) =>{
 try {
    const User = await user.findById(req.user._id).select(
      "-password -friend -reject -rejectedUsers -updatedAt -friends -createdAt -requested -ignore"
    );

    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      User,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }

}


const updateProfile = async (req, res) => {
  
    try {
    const {
      name,
      username,
      email,
      phone,
      techstack,
      age,
      gender,
      address,
    } = req.body;

    if (
      name,
      !username ||
      !email ||
      !phone ||
      !techstack ||
      !age ||
      !gender ||
      !address
    ) {
      return res.status(400).json("All fields are required");
    }

    await user.findByIdAndUpdate((req.user._id),{
      username,
      email,
      phone,
      techstack,
      age,
      gender,
      address,
    });

    return res.status(201).json({
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteProfile = async (req, res) => {
  
    try {
  

    await user.findByIdAndUpdate((req.user._id),{
      isdeltete: true
    });

  //   await res.cookie("jwtToken", "", {
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: "lax",
  //   expires: new Date(0),
  // });

    return res.status(201).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


module.exports = { getUser , updateProfile , deleteProfile };