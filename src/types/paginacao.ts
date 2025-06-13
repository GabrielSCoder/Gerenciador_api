export type paginationResponse = {
    quantidade_paginas : number
    pagina_atual : number
    quantidade_registros : number
    registros : any
}

export type baseDate = {
    data_criacao : Date
    data_modificacao : Date
    usuario_criacao : number
    usuario_modificacao : number
}