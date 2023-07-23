const mongoose = require("mongoose");

let bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required "],
    },
    bankName: {
      type: String,
      require: [true, "Name Bank is required "],
    },
    noRekening: {
      type: String,
      require: [true, "Account Number is required "],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
