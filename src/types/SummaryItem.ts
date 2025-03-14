export type SummaryItem = {
    id: number
    year: string
    cuenta: string
    cliente: string
    periodo: string
    fecha: string
    retiros: number
    depositos: number
    saldo: number
}

export type SummaryItemCreate = {
    NO_CUENTA: string
    NOMBRE_CLIENTE: string
    PERIODO: Record<string, string>
    MONEDA: string
    DEPOSITOS: number
    RETIROS: number
    SALDO_FINAL: number
    FECHA_CORTE: string
}