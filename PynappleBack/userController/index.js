const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {

  // registerUser: async (req, res) => {
  //   try {
  //     const ev = req.body.email_verified;
  //     const userModel = new UserModel(req.body);
  //     userModel.password = await bcrypt.hash(req.body.password, 10);

  //     if (ev) {
  //       const user = await UserModel.findOne({ email: userModel.email });
  //       if (!user) {
  //         const response = await userModel.save();
  //         response.password = undefined;

  //         // Generate JWT token
  //         const tokenObject = {
  //           _id: response._id,
  //           fullName: response.fullName,
  //           email: response.email,
  //         };

  //         //Ensure secret key is available
  //         // const secretKey = process.env.SECRET;
  //         // if (!secretKey) throw new Error("JWT secret key is not defined");

  //         const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
  //           expiresIn: "4h",
  //         });
  //         // console.log("login succesfull");
  //         return res.status(200).json({ jwtToken, tokenObject, state: true });
  //       } else {
  //         console.log("User already exists");
  //         const tokenObject = {
  //           _id: user._id,
  //           fullName: user.fullName,
  //           email: user.email,
  //         };
  //         const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
  //           expiresIn: "4h",
  //         });

  //         console.log("login");
  //         return res.status(200).json({ jwtToken, tokenObject, state: true });
  //       }
  //     } else {
  //       const response = await userModel.save();
  //       response.password = undefined;
  //       return res
  //         .status(201)
  //         .json({ message: "Success", data: response, state: true });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     return res
  //       .status(500)
  //       .json({ message: "Internal Server Error", err, state: false });
  //   }
  // },
  // registerUser: async (req, res) => {
  //   try {
  //     const ev = req.body.email_verified;
  //     const userModel = new UserModel(req.body);
  //     userModel.password = await bcrypt.hash(req.body.password, 10);

  //     if (ev) {
  //       const user = await UserModel.findOne({ email: userModel.email });
  //       if (user) {
  //         console.log("User already exists");
  //         return res.status(409).json({
  //           message: "User already exists",
  //           state: false,
  //         });
  //       }
  //       if (!user) {
  //         const response = await userModel.save();
  //         response.password = undefined;

  //         // Generate JWT token
  //         const tokenObject = {
  //           _id: response._id,
  //           fullName: response.fullName,
  //           email: response.email,
  //         };

  //         const secretKey = process.env.SECRET;
  //         if (!secretKey) throw new Error("JWT secret key is not defined");

  //         const jwtToken = jwt.sign(tokenObject, secretKey, {
  //           expiresIn: "4h",
  //         });

  //         console.log("Registration successful");
  //         return res.status(200).json({ jwtToken, tokenObject, state: true });
  //       } else {

  //         console.log("User already exists");
  //         return res.status(409).json({
  //           message: "User already exists",
  //           state: false,
  //         });
  //       }
  //     } else {
  //       const response = await userModel.save();
  //       response.password = undefined;
  //       return res
  //         .status(201)
  //         .json({ message: "Success", data: response, state: true });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     return res
  //       .status(500)
  //       .json({ message: "Internal Server Error", err, state: false });
  //   }
  // },
  registerUser: async (req, res) => {
    try {
      const { email, password, email_verified: ev } = req.body;

      // Check if user already exists by email
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        console.log("User already exists");
        return res.status(409).json({
          message: "User already exists",
          state: false,
        });
      }

      // Create new user instance and hash password
      const userModel = new UserModel(req.body);
      userModel.password = await bcrypt.hash(password, 10);

      // Save the new user
      const response = await userModel.save();
      response.password = undefined;

      // Handle email verified case
      if (ev) {
        const tokenObject = {
          _id: response._id,
          fullName: response.fullName,
          email: response.email,
        };

        const secretKey = process.env.SECRET;
        if (!secretKey) throw new Error("JWT secret key is not defined");

        const jwtToken = jwt.sign(tokenObject, secretKey, {
          expiresIn: "4h",
        });

        console.log("Registration successful");
        return res.status(200).json({ jwtToken, tokenObject, state: true });
      } else {
        console.log("Registration successful (email not verified)");
        return res.status(201).json({ 
          message: "Success", 
          data: response, 
          state: true 
        });
      }
    } catch (err) {
      console.error(err);
      // Handle duplicate key error from MongoDB (if unique index exists)
      if (err.code === 11000) {
        return res.status(409).json({
          message: "User already exists",
          state: false,
        });
      }
      return res.status(500).json({ 
        message: "Internal Server Error", 
        err, 
        state: false 
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const ev = req.body.email_verified;
      // if ev
      if (ev) {
        const user = await UserModel.findOne({ email: req.body.email });
        const tokenObject = {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
        };
        const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
          expiresIn: "4h",
        });
        return res.status(200).json({ jwtToken, tokenObject, state: true });
      }
      // if not ev
      else {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
          return res
            .status(401)
            .json({ message: "Invalid username/password", state: false });
        }

        const isPassEqual = await bcrypt.compare(
          req.body.password,
          user.password
        );
        // console.log(isPassEqual)
        if (!isPassEqual) {
          return res
            .status(401)
            .json({ message: " Invalid username/password", state: false });
        }
        if (isPassEqual) {
          const tokenObject = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
          };
          const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
            expiresIn: "4h",
          });
          // res.cookie('jwt',jwtToken);
          return res.status(200).json({ jwtToken, tokenObject, state: true });
        }
      }
    } catch (err) {
      return res.status(500).json({ message: "error", err });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await UserModel.find({}, { password: 0 });
      return res.status(200).json({ data: users });
    } catch (err) {
      return res.status(500).json({ message: "error", err });
    }
  },
};
