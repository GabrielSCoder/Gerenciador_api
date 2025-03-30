import { DataTypes, Model } from "sequelize"
import db from "."

class Perfil_Acesso extends Model {
    declare id: number
    declare nome: string
    declare ativo: boolean
    declare descricao: string
    declare data_criacao: Date
    declare data_modificação: Date
    declare usuario_criacao: number
    declare usuario_modificacao: number

    static associate(models : any) {
        Perfil_Acesso.hasMany(models.Perfil_Acesso_Item, {
            foreignKey : "perfil_acesso_id",
            as : "acessos"
        })

        Perfil_Acesso.hasMany(models.Usuario, {
            foreignKey : "perfil_acesso_id",
            as : "usuarios"
        })
    }
}

Perfil_Acesso.init({
    id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    descricao: DataTypes.STRING,
    data_criacao: DataTypes.DATE,
    data_modificação: DataTypes.DATE,
    usuario_criacao: DataTypes.INTEGER,
    usuario_modificacao: DataTypes.INTEGER,
}, {
    sequelize: db,
    tableName: "perfil_acesso",
    timestamps: false
})

export default Perfil_Acesso