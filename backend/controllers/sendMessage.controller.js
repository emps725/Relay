import { Message } from "../models/msg.models.js";

const sendMessage = async (req, res) => {
  try {
    const sender = req.user._id;
    const { receiver, content } = req.body;
    if (!receiver || !content?.trim()) {
      return res.status(400).json({
        message: "Details missing.",
      });
    }

    const createdMessage = await Message.create({
      sender,
      receiver,
      content,
    });

    return res.status(201).json({
      message: "Message sent successfully.",
      data: createdMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { sendMessage };
