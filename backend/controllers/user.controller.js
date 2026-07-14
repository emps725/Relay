import { User } from "../models/user.models.js";

const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        message: "Email, Username or Password is Empty",
      });
    }
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      email,
      password,
      username,
    });

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({
        message: "Certain credentials are empty.",
      });
    }

    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials.",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Credentials.",
      });
    }

    const accessToken = user.generateAccessToken();

    return res.status(200).json({
      _id: user._id,
      user: user.username,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find(
      {
        _id: { $ne: req.user._id },
      },
      "username",
    );

    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//get single user info
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId, "username avatar bio"); //!!!!!!add avatar and bio later

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully.",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { registerUser, loginUser, getUsers, getUserById };
