import { Sequelize } from "sequelize";
import { local, deploy } from "../config";

const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: deploy.DB_NAME,
        username: deploy.DB_USER,
        password: deploy.DB_PASSWORD,
        host: deploy.DB_HOST,
        dialect: "postgres",
        logging: false,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize({
        database: local.database,
        username: local.username,
        password: local.password,
        host: local.host,
        dialect: "postgres",
      });

export default sequelize;
