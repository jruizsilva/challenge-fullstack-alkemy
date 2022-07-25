import { User } from "../models";
import bcryptjs from "bcryptjs";

const getUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("getUser", error);
    res.status(401).json("Something went wrong - getUser");
  }
};

const registerUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const salt = bcryptjs.genSaltSync();

  try {
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: bcryptjs.hashSync(password, salt),
    });
    const wallet = await user.createWallet();
    res.json({ wallet, msg: "Usuario creado correctamente" });
  } catch (error) {
    console.log("registerUser", error);
    res.status(400).json("Something went wrong - registerUser");
  }
};

export { getUser, registerUser };
