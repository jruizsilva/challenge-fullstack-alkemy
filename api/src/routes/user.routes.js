import { Router } from "express";
import { getUser, registerUser } from "../controllers/user.controllers";
import { existsEmail } from "../helpers/existsEmail";
import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validateJWT";
import { check } from "express-validator";

const router = Router();

router.get("/api/users/token", validarJWT, getUser);

router.post(
  "/api/users",
  [
    check("first_name").notEmpty().withMessage("first_name es obligatorio"),
    check("last_name").notEmpty().withMessage("last_name es obligatorio"),
    check("password")
      .isLength({
        min: 6,
      })
      .withMessage("El password debe de ser más de 6 letras"),
    check("email").isEmail().withMessage("El email debe ser válido"),
    check("email").custom(existsEmail),
    validarCampos,
  ],
  registerUser
);

export default router;
