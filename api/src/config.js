import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const {
  LOCAL_DB_USERNAME,
  LOCAL_DB_PASSWORD,
  LOCAL_DB_HOST,
  LOCAL_DB_DATABASE,
  DEPLOY_DB_USERNAME,
  DEPLOY_DB_PASSWORD,
  DEPLOY_DB_HOST,
  DEPLOY_DB_DATABASE,
} = process.env;

module.exports = {
  local: {
    username: LOCAL_DB_USERNAME || "postgres",
    password: LOCAL_DB_PASSWORD || "admin",
    host: LOCAL_DB_HOST || "localhost",
    database: LOCAL_DB_DATABASE || "database",
  },
  deploy: {
    username: DEPLOY_DB_USERNAME || "postgres",
    password: DEPLOY_DB_PASSWORD || "admin",
    host: DEPLOY_DB_HOST || "localhost",
    database: DEPLOY_DB_DATABASE || "database",
  },
};
