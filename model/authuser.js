const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    min: 3,
    max: 10,
  },
  password: {
    type: Number,
    min: 8,
    max: 15,
  },
});

const User = model("Userauth", UserSchema);
module.exports = User;
