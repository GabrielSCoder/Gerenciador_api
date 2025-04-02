import { DataTypes, Model, Sequelize } from "sequelize"

class Perfil_Acesso_Item extends Model {
    declare id: number
    declare perfil_acesso_id: number
    declare acao: string
    declare controller: string
    declare data_criacao: Date
    declare data_modificação: Date
    declare usuario_criacao: number
    declare usuario_modificacao: number

    static associate(models: any) {
        Perfil_Acesso_Item.belongsTo(models.Perfil_Acesso, {
            foreignKey: "perfil_acesso_id",
            as: "perfil_item_acesso"
        })
    }

    static initModel(sequelize: Sequelize) {
        Perfil_Acesso_Item.init({
            perfil_acesso_id: DataTypes.INTEGER,
            acao: DataTypes.STRING,
            controller: DataTypes.STRING,
            data_criacao: DataTypes.DATE,
            data_modificacao: DataTypes.DATE,
            usuario_criacao: DataTypes.INTEGER,
            usuario_modificacao: DataTypes.INTEGER,
        }, {
            sequelize: sequelize,
            tableName: "perfil_acesso_item",
            timestamps: false
        })
    }
}


export default Perfil_Acesso_Item