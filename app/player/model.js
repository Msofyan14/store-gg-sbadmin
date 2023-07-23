const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const HASH_ROUND = 10;

let playersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email is required "],
    },
    name: {
      type: String,
      require: [true, "Name is required "],
      maxLength: [225, "Length name must arround 3 - 225 character "],
      mixLength: [3, "Length name must arround 3 - 225 character"],
    },
    username: {
      type: String,
      require: [true, "Name is required "],
      maxLength: [225, "Length user name must arround 3 - 225 character "],
      mixLength: [3, "Length user name must arround 3 - 225 character"],
    },
    password: {
      type: String,
      require: [true, "Password is required "],
      maxLength: [225, "Length password name max 225 character "],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    avatar: {
      type: String,
    },
    fileName: {
      type: String,
    },
    phoneNumber: {
      type: String,
      require: [true, "Phone Number is required"],
      maxLength: [13, "Length phone number max 13 character "],
      mixLength: [9, "Length phone number min 9 character"],
    },

    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

playersSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ email: value });
      return !count;
    } catch (error) {
      throw { error };
    }
  },
  (attr) => `${attr.value} already registered`
);

playersSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model("Player", playersSchema);
