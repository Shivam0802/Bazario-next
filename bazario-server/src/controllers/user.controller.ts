import mongoose from "mongoose";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { generateAccessJwt } from "../helpers/jwt";
import bcrypt from "bcrypt";

// Login a user in the database

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const UserExistCheck = (await User.findOne({
      $or: [{ email: new RegExp(`^${req.body.email}$`) }],
    }).exec()) as any;
    if (!UserExistCheck) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, UserExistCheck.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // const generateAccessJwt = (payload: any) => {
    //   return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
    // };

    const logInUser = {
      userId: UserExistCheck._id.toString(),
      role: "User",
      user: {
        name: UserExistCheck.name,
        email: UserExistCheck.email,
        contact: UserExistCheck.contact,
        address: UserExistCheck.address,
        city: UserExistCheck.city,
        state: UserExistCheck.state,
        pinCode: UserExistCheck.pinCode,
        isActive: UserExistCheck.isActive,
        _id: UserExistCheck._id,
      },
    };
    const token = await generateAccessJwt(logInUser);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};

// Create a user in the database

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log("User", req.body);
    const {
      name,
      email,
      address,
      state,
      pinCode,
      city,
      gender,
      dob,
      password,
      contact,
    } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      //console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const date = moment(dob, "DD-MM-YYYY").toISOString();

    const user = new User({
      uid: Math.floor(100000 + Math.random() * 900000),
      name: name,
      email: email,
      address: address,
      state: state,
      city: city,
      pinCode: pinCode,
      gender: gender,
      dob: date,
      password: hashedPassword,
      contact: contact,
    });

    await user.save();

    res.status(201).json({ message: `${name} registered successfully` });
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};

// Get a user from the database

export const getUsersByID = async (req: Request, res: Response) => {
  try {
    let pipeline: Array<{ $match: Record<string, any> }> = [];
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
    //console.error("Error details:", err);
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
    //console.error("Error details:", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};

// Update a user in the database

export const updateUserById = async (req: Request, res: Response) => {
  try {
    //console.log("Received update request:", req.params.id, req.body);
    const { name, email, contact } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id) as mongoose.Document & {
      _id: mongoose.Types.ObjectId;
      name: string;
      email: string;
      contact: string;
      address: string;
      city: string;
      state: string;
      pinCode: string;
      isActive: boolean;
    };

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (contact) user.contact = contact;
    await user.save();

    const token = {
      userId: user._id.toString(),
      role: "User",
      user: {
        name: user.name,
        email: user.email,
        contact: user.contact,
        address: user.address,
        city: user.city,
        state: user.state,
        pinCode: user.pinCode,
        isActive: user.isActive,
        _id: user._id
      },
    };
    const newToken = await generateAccessJwt(token);


    res.status(200).json({ message: "User updated successfully", user, token: newToken });
  } catch (err) {
    console.error("Backend Error:", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};


// Delete a user from the database

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};


// Deactivating a user from the database

// export const deactivateAccount = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid user ID" });
//     }

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.isActive = false;
//     await user.save();

//     return res.status(200).json({ message: "User account deactivated successfully" });
//   } catch (err) {
//     //console.error("Error deactivating account:", err);
//     return res.status(500).json({ message: "Something went wrong while deactivating the account" });
//   }
// };