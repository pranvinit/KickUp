require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware imports
const cors = require("cors");
const cookieParser = require("cookie-parser");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleWare = require("./middleware/error-handler");

// Routes imports
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");

const connectDB = require("./db/connect");

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.SIGNED_COOKIE_SECRET));

app.get("/api", async (req, res) => {
  res.status(200).send("API is working.");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/orders", orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleWare);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
