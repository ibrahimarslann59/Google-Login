const express = require("express");
const logger = require("morgan");
const app = express();

const config = require("./constants/config");

app.set("API_SECRET_KEY", config.API_SECRET_KEY);
app.set("DB_URL", config.DB_URL);
const db = require("./db")(app);
const cors = require("cors");

const User = require("./models/UserModel");

app.use(
  cors({
    origin: ["http://localhost:3030", "http://localhost:3000"],
    optionsSuccessStatus: 200,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const userRouter = require("./routes/userRouter");

app.use("/user", userRouter);

const { handleError } = require("./middlewares/errorMiddlewares");
const { response } = require("express");
app.use(handleError);
const port = process.env.PORT || 8081;

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`listening ${port}`);
});
