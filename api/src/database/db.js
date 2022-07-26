import { Sequelize } from "sequelize";
import { local, deploy } from "../config";

const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: deploy.database,
        username: deploy.username,
        password: deploy.password,
        host: deploy.host,
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

// const sequelize = new Sequelize({
//   database: deploy.database,
//   username: deploy.username,
//   password: deploy.password,
//   host: deploy.host,
//   dialect: "postgres",
//   logging: false,
//   pool: {
//     max: 3,
//     min: 1,
//     idle: 10000,
//   },
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//     keepAlive: true,
//   },
//   ssl: true,
// });

export default sequelize;
