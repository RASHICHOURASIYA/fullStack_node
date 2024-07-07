const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const userModel = model("auth", userSchema);

module.exports = userModel;