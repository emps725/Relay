import { Message } from "../models/msg.models.js";
import { User } from "../models/user.models.js";

//get one singular chat
const getConvo = async (req, res) => {
  try {
    const userA = req.user._id;
    const userB = req.params.userId;
    const conversation = await Message.find({
      $or: [
        {
          sender: userA,
          receiver: userB,
        },
        {
          sender: userB,
          receiver: userA,
        },
      ],
    }).sort({
      createdAt: 1,
    });

    return res.status(201).json({
      message: "Conversation fetched successfully.",
      data: conversation,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//get chat list
const getConversations = async (req, res) => {
  try {
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [{ sender: myId }, { receiver: myId }],
    });

    const userIds = new Set();

    messages.forEach((msg) => {
      if (msg.sender.toString() !== myId.toString()) {
        userIds.add(msg.sender.toString());
      }

      if (msg.receiver.toString() !== myId.toString()) {
        userIds.add(msg.receiver.toString());
      }
    });

    const users = await User.find({
      _id: { $in: [...userIds] },
    }).select("username avatar");

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { getConvo, getConversations };
