import { Transaction, Wallet, User } from "../models";

const createTransaction = async (req, res) => {
  const { userId, name, amount, type, category, date } = req.body;

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
    category,
    date,
  });

  switch (type) {
    case "egress":
      await wallet.decrement("balance", {
        by: transaction.amount,
      });
      return res.json({ msg: "Registro agregado correctamente." });
    case "ingress":
      await wallet.increment("balance", {
        by: transaction.amount,
      });
      return res.json({ msg: "Registro agregado correctamente." });
  }
};

const getTransactionsByWalletId = async (req, res) => {
  const { walletId } = req.params;
  const { category, type } = req.query;
  let where = { show: true };
  if (category) where.category = category;
  if (type) where.type = type;

  const transactions = await Transaction.findAll({
    include: { model: Wallet, where: { id: walletId } },
    where,
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
  const { name, amount, type, category, date } = req.body;

  const transaction = await Transaction.findByPk(transactionId, {
    include: { model: Wallet },
  });
  const wallet = await Wallet.findByPk(transaction.walletId);

  if (type === transaction.type) {
    switch (transaction.type) {
      case "egress":
        await wallet.increment("balance", { by: transaction.amount });
        await wallet.decrement("balance", { by: amount });
        break;
      case "ingress":
        await wallet.decrement("balance", { by: transaction.amount });
        await wallet.increment("balance", { by: amount });
        break;
    }
  } else {
    switch (type) {
      case "egress":
        await wallet.decrement("balance", { by: transaction.amount });
        await wallet.decrement("balance", { by: amount });
        break;
      case "ingress":
        await wallet.increment("balance", { by: transaction.amount });
        await wallet.increment("balance", { by: amount });
        break;
    }
  }

  const transactionUpdated = await transaction.update({
    name,
    amount,
    type,
    category,
    date,
  });

  res.json({
    transactionUpdated,
    msg: "Registro actualizado correctamente",
  });
};

export {
  createTransaction,
  getTransactionsByWalletId,
  deleteTransaction,
  updateTransaction,
};
