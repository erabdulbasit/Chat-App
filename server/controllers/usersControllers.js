import User from "../model/userModel.js";
import bcrypt from "bcrypt";

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userCheck = await User.findOne({ username });
    if (userCheck) {
      res.json({ msg: "username already exist", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      res.json({ msg: "email already exist", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    res.json({ user, status: true });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("before finding the user");
    const user = await User.findOne({ username });
    if (!user) {
      console.log("user does not found");
      return res.json({ msg: "user does'nt exist", status: false });
    }
    console.log("user is found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "password does'nt match", status: false });
    }
    delete user.password;
    res.json({ user, status: true });
  } catch (error) {
    next(error);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const user = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });

    res.json({ status: true, user });
  } catch (error) {
    console.log("error white setting avatar", error);
    res.json({ status: false });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    console.log("we are in getAllUsers");
    const userId = req.params.id;
    console.log("this is userid", userId);
    const users = await User.find({ _id: { $ne: userId } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    console.log("all users fetch except current", users);
    return res.json({ status: true, users });
  } catch (error) {
    console.log("there is some error in fetching all users.");
  }
};

export { register, login, setAvatar, getAllUsers };
