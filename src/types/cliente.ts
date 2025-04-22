export type clienteForm = {
    nome : string
    indentificacao ?: string
    endereco : string
    numero : string
    telefone ?: string
    telefone2 ?: string
}

export type clientFilter = {
    pesquisa ?: string
    dataInicio ?: string
    dataFim ?: string
    criador ?: number
    ordem ?: "ASC" | "DESC"
    modificador ?: "nome" | "data_criacao" | "data_modificacao"
    tamanhoPagina : number
    numeroPagina : number
}

export type clientPagination = {
    quantidade_clientes: number,
    pagina: number,
    numeroPaginas: number,
    listaClientes: Array<any>
}