import { Router } from "express";
import { validarCampos } from "../middlewares/validarCampos";
import { check } from "express-validator";
import { getWalletById } from "../controllers/wallet.controllers";
import { notExistsWallet } from "../helpers/notExistsWallet";

const router = Router();

router.get(
  "/api/wallet/:walletId",
  [
    check("walletId").notEmpty().withMessage("walletId es obligatorio"),
    check("walletId").custom(notExistsWallet),
    validarCampos,
  ],
  getWalletById
);

export default router;
