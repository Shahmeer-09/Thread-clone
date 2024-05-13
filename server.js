require("dotenv").config();
const cookieParser = require("cookie-parser");
const { connectDb } = require("./config/connectDb");
const express = require("express");
const bodyParser = require("body-parser");
const { StatusCodes } = require("http-status-codes");
const { errorManager } = require("./middlewares/errormanager");
const app = express();
const path = require("path");

app.use(express.json({limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use("/thread/user", require("./Routes/user.route"));
app.use("/thread/post", require("./Routes/post.route"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
})
app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json("route not found");
});
app.use(errorManager);

const port = process.env.PORT || 5100;
connectDb()
  .then(() => {
    console.log("database connected successfully");
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
