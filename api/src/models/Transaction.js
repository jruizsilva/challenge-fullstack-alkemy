import { DataTypes } from "sequelize";
import sequelize from "../database/db";

const Transaction = sequelize.define(
  "transaction",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(["egress", "ingress"]),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(["payment", "purchase", "services", "transfer"]),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    show: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Transaction;
