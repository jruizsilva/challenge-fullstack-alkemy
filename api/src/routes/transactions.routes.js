import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactionsByWalletId,
  updateTransaction,
} from "../controllers/transactions.controllers";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import { notExistsUser } from "../helpers/notexistsUser";
import { notExistsWallet } from "../helpers/notExistsWallet";
import { notExistsTransaction } from "../helpers/notExistsTransaction";

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

router.delete(
  "/api/transactions/:transactionId",
  [
    check("transactionId")
      .notEmpty()
      .withMessage("El id de la transacción es obligatorio"),
    check("transactionId").custom(notExistsTransaction),
    validarCampos,
  ],
  deleteTransaction
);

router.put(
  "/api/transactions/:transactionId",
  [
    check("transactionId")
      .notEmpty()
      .withMessage("El id de la transacción es obligatorio"),
    check("name").notEmpty().withMessage("El nombre es obligatorio"),
    check("amount").notEmpty().withMessage("amount es obligatorio"),
    check("type").notEmpty().withMessage("El tipo es obligatorio"),
    check("date").notEmpty().withMessage("La fecha es obligatoria"),
    check("transactionId").custom(notExistsTransaction),
    validarCampos,
  ],
  updateTransaction
);

export default router;