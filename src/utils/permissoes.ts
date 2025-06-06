export const permissaoUsuario = {
    controller: "usuario",
    permissoes: ["EDITAR", "CRIAR", "EXCLUIR", "DELETAR", "LISTAR"]
}

export const permissaoPerfilAcesso = {
    controller : "perfil_acesso",
    permissoes : [ "EDITAR", "CRIAR", "EXCLUIR", "DELETAR", "LISTAR"]
}

export const permissaoPerfilAcessoItem = {
    controller : "perfil_acesso_item",
    permissoes : ["EDITAR", "CRIAR", "EXCLUIR", "DELETAR", "LISTAR"]
}

export const permissoes = {
    controllers : ["usuario", "cliente", "perfil_acesso", "perfil_acesso_item", "consulta"],
    permissoes : ["EDITAR", "CRIAR", "EXCLUIR", "DELETAR", "LISTAR"]
}