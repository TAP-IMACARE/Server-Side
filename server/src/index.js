const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/user.routes");
const adminRouter = require("./routes/admin.routes");
const connectDB = require("./configs/database");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

dotenv.config();
const PORT = process.env.PORT || 3425;
const app = express();
app.use(express.json());
app.use(limiter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

connectDB(process.env.mongo_uri);

app.listen(PORT, () => {
  console.log(`Server is running with speed at ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "I am running" });
});
