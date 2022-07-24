import { Transaction, Wallet, User } from "../models";

const createTransaction = async (req, res) => {
  const { userId, name, amount, type, date } = req.body;

  const wallet = await Wallet.findOne({
    include: {
      model: User,
      where: { id: userId },
      attributes: ["id", "first_name", "last_name", "email"],
    },
  });
  const transaction = await wallet.createTransaction({
    name,
    amount,
    type,
    date,
  });

  switch (type) {
    case "egress":
      await wallet.decrement("balance", {
        by: transaction.amount,
      });
      return res.json({ msg: "Transacción creada correctamente" });
    case "ingress":
      await wallet.increment("balance", {
        by: transaction.amount,
      });
      return res.json({ msg: "Transacción creada correctamente" });
  }
};

const getTransactionsByWalletId = async (req, res) => {
  const { walletId } = req.params;
  const transactions = await Transaction.findAll({
    include: { model: Wallet, where: { id: walletId } },
    where: { show: true },
  });
  res.json(transactions);
};

const deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const transaction = await Transaction.findByPk(transactionId, {
      include: { model: Wallet },
    });
    await transaction.update({ show: false });
    const wallet = await Wallet.findByPk(transaction.walletId);
    switch (transaction.type) {
      case "egress":
        wallet.increment("balance", {
          by: transaction.amount,
        });
        return res.json({ msg: "Registro elimando correctamente" });
      case "ingress":
        await wallet.decrement("balance", {
          by: transaction.amount,
        });
        return res.json({ msg: "Registro elimando correctamente" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const updateTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const { name, amount, type, date } = req.body;

  const transaction = await Transaction.findByPk(transactionId, {
    include: { model: Wallet },
  });
  console.log(transaction.toJSON());
  const wallet = await Wallet.findByPk(transaction.walletId);
  console.log(wallet.toJSON());
  const updatedTransaction = await transaction.update({
    name,
    amount,
    type,
    date,
  });
  if (type === transaction.type) {
    switch (transaction.type) {
      case "egress":
        wallet.increment("balance", { by: transaction.amount });
        wallet.decrement("balance", { by: updatedTransaction.amount });
        return;
      case "ingress":
        wallet.decrement("balance", { by: transaction.amount });
        wallet.increment("balance", { by: updatedTransaction.amount });
        return;
    }
  }
  res.json(updatedTransaction);
};

export {
  createTransaction,
  getTransactionsByWalletId,
  deleteTransaction,
  updateTransaction,
};