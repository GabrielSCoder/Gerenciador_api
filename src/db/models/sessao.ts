import { Model, DataTypes } from "sequelize";
import db from "."

class Sessao extends Model {
    declare id: number
    declare usuario_id: number
    declare hmac: string
    declare token : string
    declare data_criacao: Date
    declare data_extincao: Date

    static associate(models : any) {
        Sessao.belongsTo(models.Usuario, {
            foreignKey : "usuario_id",
            as : "usuario"
        })
    }

    
}

Sessao.init({
    usuario_id: DataTypes.INTEGER,
    hmac: DataTypes.STRING,
    token : DataTypes.STRING,
    data_criacao: DataTypes.DATE,
    data_extincao: DataTypes.DATE
}, {
    sequelize: db,
    tableName: "sessao",
    timestamps : false
})

export default Sessao