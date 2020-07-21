const mongoose = require("mongoose");

module.exports = (app) => {
  mongoose.connect(app.get("DB_URL"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("open", () => {
    console.log("MongoDb: Connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("MongoDb: Error", err);
  });

  mongoose.Promise = global.Promise;
};
