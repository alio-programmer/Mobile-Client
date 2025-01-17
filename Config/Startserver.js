const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./DB");
const Queryrouter = require("../Routes/Query.routes");
const Summaryrouter = require("../Routes/Summarizer.routes");
const Authrouter = require("../Routes/Auth.routes");
const cookies = require("cookie-parser");

//configurations
dotenv.config();
const app = express();

//middlewares
app.use(express.json());
app.use(cookies());

//connect to server and database
const PORT = process.env.PORT || 5000;
const startserver = async () => {
  await connectDB();

  try {
    app.listen(PORT, () => {
      console.log(`server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

//routes
app.use("/api", Queryrouter);
app.use("/summary", Summaryrouter);
app.use("/auth", Authrouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = startserver;
