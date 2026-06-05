import { Message } from "../models/msg.models.js";

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

export { getConvo };
