import express from "express";
import connectDB from "./mongo/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRoutes.js";
import catRouter from "./routes/catRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   }),
// );

const corsOptions = {
  origin: 'http://localhost:3000',  // Frontend URL
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/health", (_, res) => {
  res.send("server is alive 🚀");
});

app.use("/api/users", userRouter);
app.use("/api/cats", catRouter);

app.use(notFound);
app.use(errorHandler);
connectDB();
app.listen(port, () => {
  console.log("server is alive at port", port);
});
