import { Transaction, User, Wallet } from "../models";

// Add FK userId to wallet
User.hasOne(Wallet);
Wallet.belongsTo(User);

// Add FK walledId to transaction
Wallet.hasMany(Transaction);
Transaction.belongsTo(Wallet);
