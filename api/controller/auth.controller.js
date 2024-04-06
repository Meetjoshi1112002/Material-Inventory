import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, departmentName, semester, password,role } = req.body;
    const hashPass = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      password: hashPass,
      departmentName,
      semester,
      role
    });
    await newUser.save();
    console.log("done ma chu");
    res.status(201).json({ success: true });
  } catch (error) {
    next(errorHandler(error.statusCode, error.message));
  }
};

export const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const validateUser = await User.findOne({ username });
    if (!validateUser) return next(errorHandler(404, "USerNotFOund"));
    const validPassword = bcryptjs.compareSync(password, validateUser.password);
    if (!validPassword) return next(errorHandler(401, "Not valid credentioal"));
    const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRET);
    const { semester, departmentName,role } = validateUser._doc;

    const expiryDate = new Date(Date.now()+ 3600000);
    res
      .cookie("accessToken", token, { httpOnly: true,expires:expiryDate })
      .status(200)
      .json(validateUser._doc);
  } catch (error) {
    console.log(error.message);
  }
};
