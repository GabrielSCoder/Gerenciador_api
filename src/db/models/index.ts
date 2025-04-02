import { Sequelize } from "sequelize";
import { currentConfig } from "../config/config";

const sequelize = new Sequelize(
  currentConfig.database!,
  currentConfig.username!,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect as any,
  }
);


import Perfil_Acesso from "./perfil_acesso";
import Usuario from "./usuario";
import Perfil_Acesso_Item from "./perfil_acesso_item";

Perfil_Acesso_Item.initModel(sequelize)
Perfil_Acesso.initModel(sequelize);
Usuario.initModel(sequelize);

const db: any = {
  Usuario,
  Perfil_Acesso,
  Perfil_Acesso_Item
};


Object.values(db).forEach((model: any) => {
  model.associate(db);
});

export default sequelize;
