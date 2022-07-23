import { Router } from "express";
import { login } from "../controllers/auth.controllers";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";

const router = Router();

router.post(
  "/api/auth/login",
  [
    check("email").isEmail().withMessage("Ingresa un email válido"),
    check("password").notEmpty().withMessage("La contraseña es obligatoria"),
    validarCampos,
  ],
  login
);

export default router;
