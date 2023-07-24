import User from "../models/usersModel.js";
import bcrypt from "bcrypt";

const userCreate = async (req, res) => {
  const { email, password1, password2 } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    res.status(483).json("Bu mail adresi zaten kullanımda");
    return;
  }

  if (password1 !== password2) {
    res.status(475).json({
      error: "Girdiğiniz şifre birbiriyle uyuşmuyor",
    });
    return;
  }

  const newUser = new User({
    name: req.body.name,
    email,
    password: password1,
  });
  await newUser.save();

  res.status(200).json(newUser);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          res.status(200).json({
            user,
          });
        } else {
          res.status(476).json({
            message: "Şifreniz yanlış",
          });
        }
      });
    } else {
      res.status(475).json({ message: "Email Veritabanında Eşleşmedi" });
    }
  } catch (error) {
    res.status(400).json({
      error: "Bilmiyom try'ın içine girmiyor",
    });
  }
};
export { userCreate, loginUser };
