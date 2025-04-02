import { DataTypes, Model, Sequelize } from "sequelize";
import db from ".";

class Perfil_Acesso extends Model {
    declare id: number;
    declare nome: string;
    declare ativo: boolean;
    declare descricao: string;
    declare data_criacao: Date;
    declare data_modificacao: Date;
    declare usuario_criacao: number;
    declare usuario_modificacao: number;

    static associate(models: any) {
        Perfil_Acesso.hasMany(models.Usuario, {
            foreignKey: "perfil_acesso_id",
            as: "perfil_acesso_usuario"
        });
        Perfil_Acesso.hasMany(models.Perfil_Acesso_Item, {
            foreignKey : "perfil_acesso_id",
            as : "perfil_item_acesso"
        })
    }

    static initModel(sequelize: Sequelize) {
        Perfil_Acesso.init(
            {
                nome: DataTypes.STRING,
                ativo: DataTypes.BOOLEAN,
                descricao: DataTypes.STRING,
                data_criacao: DataTypes.DATE,
                data_modificacao: DataTypes.DATE,
                usuario_criacao: DataTypes.INTEGER,
                usuario_modificacao: DataTypes.INTEGER,
            },
            {
                sequelize,
                tableName: "perfil_acesso",
                timestamps: false,
            }
        );
    }
}

export default Perfil_Acesso;
