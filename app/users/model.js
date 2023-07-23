const mongoose = require("mongoose");

let usersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email is required "],
    },
    name: {
      type: String,
      require: [true, "Name is required "],
    },
    password: {
      type: String,
      require: [true, "Password is required "],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    phoneNumber: {
      type: String,
      require: [true, "Phone Number is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", usersSchema);
