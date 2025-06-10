export type consultaForm = {
    descricao: string;
    preco: number;
    cliente_id: number;
    tipo: string;
    procedimento: string;
    forma_pagamento: string;
    profissional_id: number;
    data_criacao: Date;
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
    listaClientes: Array<any>
}