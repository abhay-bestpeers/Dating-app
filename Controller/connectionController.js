const Connection = require("../Model/Connection");
const User = require("../Model/userModel");


const rejectUser = async (req, res) => {
  try {
    const requestId = req.params.id;

    const connection = await Connection.findById(requestId);

    if (!connection) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    if (connection.to.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your request to accept" });
    }

    if (connection.status === "rejected") {
      return res.status(400).json({ message: "Request already processed" });
    }

    connection.status = "rejected";
    await connection.save();

    const from = connection.from;
    const to = connection.to;

  
    await User.findByIdAndUpdate(from, { $addToSet: { rejectedUsers: to } });
    await User.findByIdAndUpdate(to, { $addToSet: { rejectedUsers: from } });

    res.json({ message: "Friend request rejected successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    const connection = await Connection.findById(requestId);

    if (!connection) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    if (connection.to.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your request to accept" });
    }

    if (connection.status === "accepted") {
      return res.status(400).json({ message: "Request already processed" });
    }

    connection.status = "accepted";
    await connection.save();

    const from = connection.from;
    const to = connection.to;

  
    await User.findByIdAndUpdate(from, { $addToSet: { friends: to } });
    await User.findByIdAndUpdate(to, { $addToSet: { friends: from } });

    res.json({ message: "Friend request accepted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  rejectUser,
  acceptRequest,
};
