import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import sequelize from "./database/db";
import authRoute from "./routes/auth.routes";
import userRoute from "./routes/user.routes";
import transactionsRoute from "./routes/transactions.routes";
import walletRoute from "./routes/wallet.routes";
import "./database/asociations";

const app = express();
// Settings
app.set("port", process.env.PORT || 3001);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

// Routes
app.use(userRoute);
app.use(authRoute);
app.use(transactionsRoute);
app.use(walletRoute);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB connected");
    app.listen(app.get("port"), () => {
      console.log("Server listening on port", app.get("port"));
    });
  })
  .catch((err) => {
    console.log(err);
  });
