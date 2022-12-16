const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: String,
});

const Userrole = model("Users", UserSchema);
module.exports = Userrole;
