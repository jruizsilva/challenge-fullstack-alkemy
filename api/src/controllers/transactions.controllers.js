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
      const decrementResult = await wallet.decrement("balance", {
        by: transaction.amount,
      });
      return res.json(decrementResult);
    case "ingress":
      const incrementResult = await wallet.increment("balance", {
        by: transaction.amount,
      });
      return res.json(incrementResult);
  }
};

const getTransactionsByWalletId = async (req, res) => {
  const { walletId } = req.params;
  const transactions = await Transaction.findAll({
    include: { model: Wallet, where: { id: walletId } },
  });
  res.json(transactions);
};

export { createTransaction, getTransactionsByWalletId };
