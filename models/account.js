const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const AccountModel = mongoose.model("account", AccountSchema);

module.exports = AccountModel;
