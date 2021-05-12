const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

// Connect to database
mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database is connected")
);

// Connect to server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

app.use('/uploads', express.static(process.cwd() + 'uploads'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Routes
app.use("/auth", require("./routes/userRouter.js"));
app.use("/post", require("./routes/postRouter.js"));
