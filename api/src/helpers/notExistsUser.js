import { User } from "../models";

const notExistsUser = async (userId = "") => {
  // Verifica si existe un usuario con ese id
  const existeUsuario = await User.findByPk(userId);
  if (!existeUsuario) {
    throw new Error(`No existe un usuario con el id: ${userId}`);
  }
};

export { notExistsUser };
