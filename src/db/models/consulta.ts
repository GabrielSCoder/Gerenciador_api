import { DataTypes, Model, Sequelize } from "sequelize";
import Cliente from "./cliente";

class Consulta extends Model {
    declare id: number
    declare descricao: string
    declare procedimento: string
    declare tipo: string
    declare preco: number
    declare horario: Date
    declare hora_marcada: boolean
    declare cliente_id: number
    declare status: number
    declare dente_afetado: string
    declare forma_pagamento: string
    declare pago: boolean
    declare observacoes: string
    declare data_criacao: Date
    declare data_modificacao: Date
    declare usuario_criacao: number
    declare usuario_modificacao: number
    declare profissional_id: number

    static associate(models: any) {
        Consulta.belongsTo(models.Cliente, {
            foreignKey: "cliente_id",
            as: "cliente"
        });
        Consulta.belongsTo(models.Usuario, {
            foreignKey: "profissional_id",
            as: "profissional"
        });

        Consulta.belongsTo(models.Usuario, {
            foreignKey: "usuario_criacao",
            as: "usuario_criador"
        })

        Consulta.belongsTo(models.Usuario, {
            foreignKey: "usuario_modificacao",
            as: "usuario_modificador"
        })
    }

    static InitModel(sequelize: Sequelize) {
        Consulta.init({
            descricao: DataTypes.INTEGER,
            procedimento: DataTypes.STRING,
            tipo: DataTypes.TEXT,
            preco: DataTypes.DECIMAL,
            horario: DataTypes.DATE,
            hora_marcada: DataTypes.BOOLEAN,
            cliente_id: DataTypes.INTEGER,
            profissional_id: DataTypes.INTEGER,
            status: DataTypes.ENUM("marcada", "concluida", "cancelada"),
            dente_afetado: DataTypes.TEXT,
            forma_pagamento: DataTypes.TEXT,
            pago: DataTypes.BOOLEAN,
            observacoes: DataTypes.TEXT,
            data_criacao: DataTypes.DATE,
            data_modificacao: DataTypes.DATE,
            usuario_criacao: DataTypes.INTEGER,
            usuario_modificacao: DataTypes.INTEGER
        },
            {
                modelName: "consulta",
                tableName: "consulta",
                timestamps: false,
                sequelize
            })
    }
}

export default Consulta