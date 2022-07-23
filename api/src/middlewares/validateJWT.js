import jwt from "jsonwebtoken";
import { User } from "../models";

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }
  try {
    const { id } = jwt.verify(token, process.env.PRIVATE_KEY_JWT);
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(401).json({
        msg: "Token no válido",
      });
    }
    if (!user.active) {
      return res.status(401).json({
        msg: "Token no válido",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
