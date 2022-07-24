import { Router } from "express";
import {
  createTransaction,
  getTransactionsByWalletId,
} from "../controllers/transactions.controllers";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import { notExistsUser } from "../helpers/notexistsUser";
import { notExistsWallet } from "../helpers/notExistsWallet";

const router = Router();

router.get(
  "/api/transactions/:walletId",
  [
    check("walletId")
      .notEmpty()
      .withMessage("El id del usuario es obligatorio"),
    check("walletId").custom(notExistsWallet),
    validarCampos,
  ],
  getTransactionsByWalletId
);

router.post(
  "/api/transactions",
  [
    check("userId").notEmpty().withMessage("El id del usuario es obligatorio"),
    check("name").notEmpty().withMessage("El nombre es obligatorio"),
    check("amount").notEmpty().withMessage("amount es obligatorio"),
    check("type").notEmpty().withMessage("El tipo es obligatorio"),
    check("date").notEmpty().withMessage("La fecha es obligatoria"),
    check("userId").custom(notExistsUser),
    validarCampos,
  ],
  createTransaction
);

export default router;
