import { Wallet } from "../models";

const getWalletById = async (req, res) => {
  const { walletId } = req.params;

  try {
    const wallet = await Wallet.findByPk(walletId);
    res.json(wallet);
  } catch (error) {
    console.log("getWalletById", error);
    res.status(400).json("Something went wrong - login");
  }
};

export { getWalletById };
