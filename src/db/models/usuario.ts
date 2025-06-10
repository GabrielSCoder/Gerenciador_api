import { Model, DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

class Usuario extends Model {
    declare id: number;
    declare perfil_acesso_id: number;
    declare nome: string;
    declare email: string;
    declare senha: string;
    declare data_nascimento : Date;


    check(password: string): boolean {
        return bcrypt.compareSync(password, this.senha);
    }

    static associate(models: any) {

        Usuario.belongsTo(models.Perfil_Acesso, {
            foreignKey: "perfil_acesso_id",
            as: "perfil_acesso_usuario"
        });

        Usuario.hasMany(models.Cliente, {
            foreignKey : "usuario_criacao",
            as : "usuario_criador"
        })

        Usuario.hasMany(models.Cliente, {
            foreignKey : "usuario_modificacao",
            as : "usuario_modificador"
        })

        Usuario.hasMany(models.Consulta, {
            foreignKey : "profissional_id",
            as : "usuario_profissional"
        })
               
    }


    static initModel(sequelize: Sequelize) {
        Usuario.init(
            {
                nome: DataTypes.STRING,
                senha: DataTypes.STRING,
                email: DataTypes.STRING,
                perfil_acesso_id: DataTypes.INTEGER,
                data_nascimento : DataTypes.DATEONLY,
                data_criacao: DataTypes.DATE,
                data_modificacao: DataTypes.DATE
            },
            {
                tableName: "usuario",
                modelName: "usuario",
                timestamps: false,
                sequelize,
                hooks: {
                    beforeCreate: async (user) => {
                        const salt = await bcrypt.genSalt(10);
                        user.senha = await bcrypt.hash(user.senha, salt);
                    },
                    beforeUpdate: async (user) => {
                        if (user.changed("senha")) {
                            const salt = await bcrypt.genSalt(10);
                            user.senha = await bcrypt.hash(user.senha, salt);
                        }
                    }
                }
            }
        );
    }
}

export default Usuario;
