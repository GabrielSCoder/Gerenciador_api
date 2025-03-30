import { Sequelize } from "sequelize";
import { currentConfig } from "../config/config";

console.log(currentConfig)

const sequelize = new Sequelize(
  currentConfig.database!,
  currentConfig.username!,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect as any,
  }
);

export default sequelize;