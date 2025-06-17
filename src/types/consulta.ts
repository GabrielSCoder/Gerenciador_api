export type consultaForm = {
    descricao: string;
    preco: number;
    cliente_id: number;
    tipo: string;
    procedimento: string;
    forma_pagamento: string;
    profissional_id: number;
    horario?: Date;
    cancelado?: boolean;
    dente_afetado?: string;
    observacoes?: string;
    data_modificacao?: Date;
    pago?: boolean;
    status?: number;
};

export type consultaPagination = {
    quantidade: number,
    pagina: number,
    numeroPaginas: number,
    listaConsultas: Array<any>
}

export type consultaFilter = {
    pesquisa ?: string
    dataCadastroInicio ?: string
    dataCadastroFim ?: string
    horarioInicio ?: string
    horarioFim ?: string
    criador ?: number
    cliente ?: number
    profissional ?: number
    ordem ?: "ASC" | "DESC"
    modificador ?: "status" | "horario" | "data_criacao" | "data_modificacao" | "forma_pagamento" | "cliente_nome"
    tamanhoPagina : number
    numeroPagina : number
}