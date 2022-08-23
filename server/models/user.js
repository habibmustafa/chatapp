const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
   {
      email: {
         type: String,
         required: true,
         // unique: true,
      },
      username: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
   },
   { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", user);
module.exports = User;
