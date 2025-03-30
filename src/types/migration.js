import Sequelize from "sequelize"

const baseColumns = {
    data_criacao: {
        allowNull: false, type: typeof Sequelize.DATE
    },
    usuario_criacao: {
        allowNull: true, type: typeof Sequelize.DATE, references: { model: "usuario", key: "id" }
    },
    usuario_modificacao: {
        allowNull: false, type: typeof Sequelize.DATE, references: { model: "usuario", key: "id" }
    },
    data_modificao: { allowNull: true, type: typeof Sequelize.DATE }
}

module.exports = baseColumns