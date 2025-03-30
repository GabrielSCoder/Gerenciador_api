import { DataTypes, Model } from "sequelize"
import db from "."

class Perfil_Acesso_Item extends Model {
    declare id: number
    declare perfil_acesso_id: number
    declare acao: string
    declare controller: string
    declare data_criacao: Date
    declare data_modificação: Date
    declare usuario_criacao: number
    declare usuario_modificacao: number

    static associate(models : any) {
        Perfil_Acesso_Item.belongsTo(models.Perfil_Acesso, {
            foreignKey : "perfil_acesso_id",
            as : "perfil_acesso"
        })
    }
}

Perfil_Acesso_Item.init({
    id: DataTypes.INTEGER,
    perfil_acesso_id: DataTypes.INTEGER,
    acao: DataTypes.STRING,
    controller: DataTypes.STRING,
    data_criacao: DataTypes.DATE,
    data_modificação: DataTypes.DATE,
    usuario_criacao: DataTypes.INTEGER,
    usuario_modificacao: DataTypes.INTEGER,
}, {
    sequelize: db,
    tableName: "perfil_acesso_item",
    timestamps: false
})

export default Perfil_Acesso_Item