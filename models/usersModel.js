import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const usersModel = new Schema({
  name: {
    type: String,
    reqired: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  }
});
usersModel.pre("save", function (next) {
  const user = this;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, 10, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", usersModel);
export default User;
