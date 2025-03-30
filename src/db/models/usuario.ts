import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt"
import db from "."

class Usuario extends Model {
    declare id: number
    declare perfil_acesso_id : number
    declare nome: string
    declare email: string
    declare senha: string

    check(password : string): boolean {
        return bcrypt.compareSync(password, this.senha);
    }

    async associate(models: any) {
        Usuario.hasMany(models.Sessao, {
            foreignKey : "usuario_id",
            as : "sessoes"
        })

        Usuario.belongsTo(models.Perfil_Acesso, {
            foreignKey : "perfil_acesso_id",
            as : "perfil_acesso"
        })
    }
  
}

Usuario.init({
    nome: DataTypes.STRING,
    senha: DataTypes.STRING,
    email: DataTypes.STRING,
    perfil_acesso_id : DataTypes.INTEGER,
    data_criacao: DataTypes.DATE,
    data_modificacao: DataTypes.DATE
}, {
    tableName: "usuario",
    modelName: "usuario",
    timestamps: false,
    sequelize: db,
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10)
            user.senha = await bcrypt.hash(user.senha, salt)
        },
        beforeUpdate: async (user) => {
            if (user.changed("senha")) {
                const salt = await bcrypt.genSalt(10)
                user.senha = await bcrypt.hash(user.senha, salt)
            }
        }
    }
})

export default Usuario