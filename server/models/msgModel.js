const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const message = new Schema(
   {
      message: {
         text: { type: String, required: true },
      },
      users: Array,
      sender: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
   },
   { timestamps: true, versionKey: false }
);

const User = mongoose.model("Message", message);
module.exports = User;
