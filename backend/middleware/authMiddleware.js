import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (!token) {
    res.status(408);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid token");
  }
});

export { protect };
