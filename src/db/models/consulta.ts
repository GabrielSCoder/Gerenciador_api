import { DataTypes, Model, Sequelize } from "sequelize";
import Cliente from "./cliente";

class Consulta extends Model {
    declare id: number
    declare descricao: string
    declare preco: number
    declare cancelado: boolean
    declare horario: Date
    declare cliente_id : number
    declare data_criacao: Date
    declare data_modificacao: Date
    declare usuario_criacao: number
    declare usuario_modificacao: number

    static associate(models: any) {
        Cliente.belongsTo(models.Usuario, {
            foreignKey: "cliente_id",
            as: "cliente"
        });
    }

    static InitModel(sequelize: Sequelize) {
        Consulta.init({
            descricao: DataTypes.INTEGER,
            preco: DataTypes.DECIMAL,
            cliente_id : DataTypes.INTEGER,
            cancelado: DataTypes.BOOLEAN,
            horario: DataTypes.DATE,
            data_criacao: DataTypes.DATE,
            data_modificacao: DataTypes.DATE,
            usuario_criacao: DataTypes.INTEGER,
            usuario_modificacao: DataTypes.INTEGER
        },
            {
                modelName: "consulta",
                tableName: "consulta",
                timestamps : false,
                sequelize
            })
    }
}

export default Consulta