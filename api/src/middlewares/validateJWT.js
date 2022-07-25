import jwt from "jsonwebtoken";
import { Transaction, User, Wallet } from "../models";

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
      include: {
        model: Wallet,
        where: { userId: id },
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
    const { active, ...rest } = user.toJSON();
    req.user = rest;
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
