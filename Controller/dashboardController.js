const User = require("../Model/userModel");
const connection = require("../Model/Connection");

const getAllUser = async (req, res) => {
  try {
    const me = await User.findById(req.user._id);

    if (!me) {
      return res.status(404).json({ message: "User not found" });
    }

    const excludedIds = [...me.friends, ...me.rejectedUsers,...me.requested,...me.ignore, me._id];

    const users = await User.find({
      _id: { $nin: excludedIds },
    }).select(
      "-password -friend -reject -rejectedUsers -updatedAt -friends -createdAt"
    );

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const sendRequest = async (req, res) => {
  try {
    const from = req.user._id;
    const to = req.params.id;

    const data = await connection.findOneAndUpdate(
      { from, to },
      { status: "interested" },
      { upsert: true, new: true }
    );

    await User.findByIdAndUpdate(from, { $addToSet: { requested: to } });
    await User.findByIdAndUpdate(to, { $addToSet: { requested: from } });

    res.json({
      data,
      message: "Friend request sent successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const ignoreUser = async (req, res) => {
  try {
    const from = req.user._id;
    const to = req.params.id;

    const data = await connection.findOneAndUpdate(
      { from, to },
      { status: "ignore" },
      { upsert: true, new: true }
    );

    await User.findByIdAndUpdate(from, { $addToSet: { requested: to } });
    await User.findByIdAndUpdate(to, { $addToSet: { requested: from } });

    res.json({
      data,
      message: "User ignored successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const friendRequest = async (req, res) => {
  try {
    const request = await connection
      .find({
        $and: [{ to: req.user._id }, { status: "interested" }],
      })
      .populate("from", "username email techstack age gender address");

    return res
      .status(200)
      .json({ success: true, message: "fetched successfully", data: request });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// const friendList =  async(req,res) =>{

//   try{
//     const result = await connection.find({
//       $and: [{
//         $or:[{to:req.user._id},{from: req.user._id}]
//       },{status:"accepted"}]
//     });
//     return res.status(200).json({success:true,message:"fetched", data:result});
//   }catch(error){
//        return res.status(400).json({success:false,message:error.message})
//   }
// }

const friendList = async (req, res) => {
  try {
    const me = await User.findById(req.user._id);

    if (!me) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const result = await User.find({
      _id: { $in: me.friends },
    }).select(
      "-password -updatedAt -createdAt -rejectedUsers -friends -__v -phone"
    );

    return res.status(200).json({
      success: true,
      message: "Friends fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllUser,
  sendRequest,
  ignoreUser,
  friendRequest,
  friendList,
};
