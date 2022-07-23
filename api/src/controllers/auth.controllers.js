import { User } from "../models";
import { generateJWT } from "../helpers/generateJWT";
import bcryptjs from "bcryptjs";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        msg: "El email o la contraseña no son validos",
      });
    }
    if (!user.active) {
      return res.status(400).json({
        msg: "El usuario ha sido bloquedo.",
      });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "El email o la contraseña no son validos",
      });
    }
    const token = await generateJWT(user.id);
    res.json({ token });
  } catch (error) {
    console.log("login", error);
    res.status(400).json("Something went wrong - login");
  }
};

export { login };
