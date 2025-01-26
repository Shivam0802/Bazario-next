import mongoose from "mongoose";
import User from "../models/user.model";
import { Request, Response } from "express";
import { randomBytes as cryptoRandomBytes, scryptSync } from "crypto";
import moment from "moment";


// Login a user in the database

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 

    const salt = cryptoRandomBytes(8).toString("hex");
    const hashedPassword = scryptSync(password, salt, 32).toString("hex");

    if (user.password !== hashedPassword) {
      return res.status(401).json({ message: "Invalid password" });
    } else {
      res.status(200).json({ message: "Login successful" });
    }

  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
}

// Create a user in the database

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      gender,
      dob,
      password,
      contact,
    } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = cryptoRandomBytes(8).toString("hex");
    const hashedPassword = scryptSync(password, salt, 32).toString("hex");

    const date = moment(dob, "DD-MM-YYYY");

    const user = await User.create({
      uid: Math.floor(100000 + Math.random() * 900000),
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      gender: gender,
      dob: dob,
      password: hashedPassword,
      contact: contact,
    });

    const name = `${user.firstName} ${user.lastName}`;
    res.status(201).json({ message: `${name} registered successfully` });
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};

// Get a user from the database

export const getUsersByID = async (req: Request, res: Response) => {
  try {
    let pipeline = [];
    let matchObj: Record<string, any> = {};
    if (req.params.id) {
      matchObj._id = new mongoose.Types.ObjectId(req.params.id);
    }

    pipeline.push({ $match: matchObj });

    const users = await User.aggregate(pipeline);
    res.status(200).json(users);

    if (users.length === 0) {
      res.status(404).json({ message: "No users found" });
    }
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};

// Get all users from the database

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);

    if (users.length === 0) {
      res.status(404).json({ message: "No users found" });
    }
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};

// Update a user in the database

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, address, contact } = req.body;

    const user = await User.findOne({ objectId: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.address = address;
      user.contact = contact;
      await user.save();
      res.status(200).json({ message: "User updated successfully" });
    }
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};

// Delete a user from the database

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ objectId: req.params.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      await user.deleteOne();
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};
