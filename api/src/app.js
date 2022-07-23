import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import sequelize from "./database/db";
import authRoute from "./routes/auth.routes";
import userRoute from "./routes/user.routes";
import "./models";

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

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("DB connected");
    app.listen(app.get("port"), () => {
      console.log("Server listening on port", app.get("port"));
    });
  })
  .catch((err) => {
    console.log(err);
  });