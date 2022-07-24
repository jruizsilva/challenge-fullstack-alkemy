import { Wallet } from "../models";

const notExistsWallet = async (walletId = "") => {
  // Verifica si existe un usuario con ese id
  const existeWallet = await Wallet.findByPk(walletId);
  if (!existeWallet) {
    throw new Error(`No existe una wallet con el id ${walletId}`);
  }
};

export { notExistsWallet };
