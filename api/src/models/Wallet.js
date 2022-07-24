import { DataTypes } from "sequelize";
import sequelize from "../database/db";

const Wallet = sequelize.define(
  "wallet",
  {
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: false }
);

export default Wallet;
