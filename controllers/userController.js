import Influencer from "../model/Influencer.js";
import User from "../model/User.js";

export const storeInfluencer = async (req, res) => {
  try {
    const { influencerId } = req.body;
    const influencer = new Influencer({ influencerId });
    await influencer.save();

    res.status(200).json({ message: "Campaign created successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to create campaign" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
};

export const getUserByPrivyId = async (req, res) => {
  try {
    const { privyId } = req.params;
    const user = await User.findOne({ privyId });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user by privyId:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, walletAddress, privyId } = req.body;
    const user = new User({ username, email, walletAddress, privyId });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { privyId } = req.body;
    const user = await User.findOne({ privyId }); 

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Failed to login user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updates },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userPrivyId } = req.params; 
    const { role } = req.body;
    const user = await User.findOneAndUpdate(
      { privyId: userPrivyId },
      { $set: { role } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Failed to update user role" });
  }
};
