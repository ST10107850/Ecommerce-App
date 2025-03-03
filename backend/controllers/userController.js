import expressAsyncHandler from "express-async-handler";
import Users from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import mongoose from "mongoose";

export const createUser = expressAsyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    idNumber,
    role,
    password,
    profileImage,
  } = req.body;

  const userExist = await Users.findOne({ email, phone, idNumber });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = await Users.create({
    firstName,
    lastName,
    email,
    phone,
    idNumber,
    role,
    password,
    profileImage,
  });

  res.status(201).json({
    success: true,
    message: "User successfully registered",
    data: newUser,
  });
});

export const authUser = expressAsyncHandler(async (req, res) => {   
  const { email, password } = req.body;

  const user = await Users.findOne({ email });
  console.log(user);
  

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    return res
      .status(201)
      .json({ success: true, message: "Login Successsfully.....", data: user });
  }

  res.status(404);
  throw new Error("Invalid email or password");
});

export const logout = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", " ", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successfully....." });
});

export const getuserProfile = expressAsyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    phone: req.user.phone,
    idNumber: req.user.idNumber,
    address: req.user.address,
    role: req.user.role,
    status: req.user.status,
    profileImage: req.use.profileImage,
  };

  res.status(200).json({ message: "user Profile", data: user });
});

export const updateProfile = expressAsyncHandler(async (req, res) => {
  const user = await Users.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.idNumber = req.body.idNumber || user.idNumber;
    user.profileImage = req.body.profileImage || user.profileImage;

    // ✅ Handle Address Updates Properly
    if (req.body.address) {
      req.body.address.forEach((newAddress) => {
        const existingAddressIndex = user.address.findIndex(
          (addr) => addr._id.toString() === newAddress._id
        );

        if (existingAddressIndex !== -1) {
          // ✅ Update existing address
          user.address[existingAddressIndex] = {
            ...user.address[existingAddressIndex],
            ...newAddress,
          };
        } else {
          // ✅ Add new address with a generated ObjectId
          user.address.push({
            _id: new mongoose.Types.ObjectId(),
            ...newAddress,
          });
        }
      });
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const getCustomerUser = expressAsyncHandler(async (req, res) => {
  const users = await Users.find({ role: "customer" });

  res.status(201).json({ success: true, data: users });
});

export const updateUserPassword = expressAsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword && !newPassword) {
    res.status(401);
    throw new Error("Please provide both old and new passwords.");
  }

  const user = await Users.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const isMatch = await user.matchPassword(oldPassword);

  if (!isMatch) {
    res.status(401);
    throw new Error("Old password is incorrect");
  }
  user.password = newPassword;
  await user.save();

  res.status(201).json({ message: "Password updated successfully" });
});

export const deleteAddress = expressAsyncHandler(async (req, res) => {
  const { addressId } = req.params;

  const user = await Users.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const addressIndex = user.address.findIndex(
    (address) => address._id.toString() == addressId
  );

  if (addressIndex === -1) {
    res.status(401);
    throw new Error("Address not found");
  }

  user.address.splice(addressIndex, 1);
  await user.save();

  res.status(200).json({ message: "Address deleted successfully" });
});
