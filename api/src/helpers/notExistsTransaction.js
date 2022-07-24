import { Transaction } from "../models";

const notExistsTransaction = async (transactionId = "") => {
  // Verifica si existe la transaction con ese id
  const existeTransaction = await Transaction.findByPk(transactionId);
  if (!existeTransaction) {
    throw new Error(`No existe una Transaction con el id: ${transactionId}`);
  }
};

export { notExistsTransaction };
