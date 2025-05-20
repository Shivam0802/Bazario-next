import mongoose from "mongoose";
import User,{IUser} from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { generateAccessJwt } from "../helpers/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../helpers/email";

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

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      UserExistCheck.password
    );

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
        role: UserExistCheck.role,
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
    //console.log("User", req.body);
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
      role: "User",
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
    const {
      name, email, contact, address, gstNumber, city, state, pinCode, role, businessAddress, businessCity, businessName, businessPinCode, businessState, businessType, panCardandTaxID, paymentMethod, bankName, accountNumber, ifscCode, upiId, cinNumber,
    } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = (await User.findById(id)) as mongoose.Document & {
      _id: mongoose.Types.ObjectId;
      name: string;
      role: string;
      email: string;
      contact: string;
      address: string;
      city: string;
      state: string;
      pinCode: string;
      gstNumber: string;
      panCardandTaxID: string;
      businessName: string;
      businessType: string;
      paymentMethod: string;
      cinNumber: string;
      businessAddress: string;
      businessCity: string;
      businessState: string;
      businessPinCode: string;
      bankName: string;
      accountNumber: string;
      ifscCode: string;
      upiId: string;
      isActive: boolean;
    };

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (contact) user.contact = contact;
    if (address) user.address = address;
    if (city) user.city = city;
    if (state) user.state = state;
    if (pinCode) user.pinCode = pinCode;
    if (gstNumber) user.gstNumber = gstNumber;
    if (role) user.role = role;
    if (panCardandTaxID) user.panCardandTaxID = panCardandTaxID;
    if (businessName) user.businessName = businessName;
    if (businessAddress) user.businessAddress = businessAddress;
    if (businessCity) user.businessCity = businessCity;
    if (businessState) user.businessState = businessState;
    if (businessPinCode) user.businessPinCode = businessPinCode;
    if (businessType) user.businessType = businessType;
    if (bankName) user.bankName = bankName;
    if (ifscCode) user.ifscCode = ifscCode;
    if (upiId) user.upiId = upiId;
    if (cinNumber) user.cinNumber = cinNumber;
    if (paymentMethod) user.paymentMethod = paymentMethod;
    if (accountNumber) user.accountNumber = accountNumber;

    await user.save();

    const token = {
      userId: user._id.toString(),
      role: "User",
      user: {
        name: user.name,
        role: user.role,
        email: user.email,
        contact: user.contact,
        address: user.address,
        city: user.city,
        state: user.state,
        pinCode: user.pinCode,
        gstNumber: user.gstNumber,
        isActive: user.isActive,
        _id: user._id,
      },
    };
    const newToken = await generateAccessJwt(token);

    res
      .status(200)
      .json({ message: "User updated successfully", user, token: newToken });
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


//Forget Password for user

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    } 

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = await generateAccessJwt({ 
      userId: (user._id as mongoose.Types.ObjectId).toString(), 
      email: user.email,
      role: user.role 
    });

    const resetLink = `http://localhost:3000/resetPassword?token=${token}`;
    const mailOptions = {
      to: email,
      subject: "Password Reset",
      text: `Click the link below to reset your password:\n\n${resetLink}`,
    };

    await sendEmail(mailOptions);

    res.status(200).json({ message: "Password reset link sent successfully" });

  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    let decoded;
    try {
      decoded = jwt.decode(token);
    } catch (error) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById((decoded as { userId: string }).userId);

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
