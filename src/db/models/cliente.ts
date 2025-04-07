import { Model, DataTypes, Sequelize } from "sequelize";

class Cliente extends Model {
    declare id: number;
    declare nome: string;
    declare indentificacao: string;
    declare telefone : string;
    declare telefone2 : string;
    declare endereco: string;
    declare numero: string;
    declare ativo : boolean;
    declare data_nascimento : Date;
    declare usuario_criacao : number;
    declare usuario_modificacao : number;

    static associate(models: any) { 
        Cliente.hasMany(models.Consulta, {
            foreignKey : "cliente_id",
            as : "consultas"
        })
    }

    static initModel(sequelize: Sequelize) {
        Cliente.init(
            {
                nome: DataTypes.STRING,
                indentificacao: DataTypes.STRING,
                telefone : DataTypes.STRING,
                telefone2 : DataTypes.STRING,
                endereco: DataTypes.STRING,
                numero: DataTypes.STRING,
                data_nascimento : DataTypes.DATEONLY,
                usuario_criacao : DataTypes.INTEGER, 
                usuario_modificacao : DataTypes.INTEGER,
                data_criacao: DataTypes.DATE,
                data_modificacao: DataTypes.DATE
            },
            {
                tableName: "cliente",
                modelName: "cliente",
                timestamps: false,
                sequelize
            }
        );
    }
}

export default Cliente;
