const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/user.routes");
const adminRouter = require("./routes/admin.routes");
const paymentRouter = require("./routes/payment.routes");
const seedAdmin = require("./seeding/index");
const connectDB = require("./configs/database");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

dotenv.config();
const PORT = process.env.PORT || 3425;
const app = express();
app.use(express.json());
app.use(limiter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/pay", paymentRouter);

connectDB(process.env.MONGO_URI);
seedAdmin();

app.listen(PORT, () => {
  console.log(`Server is running with speed at PORT ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "I am running" });
});
