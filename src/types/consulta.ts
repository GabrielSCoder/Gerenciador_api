export type consultaForm = {
    descricao : string
    horario ?: Date
    cancelado ?: boolean
    cliente_id : number
    preco : number
}

export type consultaPagination = {
    quantidade: number,
    pagina: number,
    numeroPaginas: number,
    listaClientes: Array<any>
}