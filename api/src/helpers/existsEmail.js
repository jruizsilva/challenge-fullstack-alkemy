import { User } from "../models";

const existsEmail = async (email = "") => {
  // Verificar si el email existe
  const existeEmail = await User.findOne({ where: { email } });
  if (existeEmail) {
    throw new Error(`El email: ${email}, ya está registrado`);
  }
};

export { existsEmail };
