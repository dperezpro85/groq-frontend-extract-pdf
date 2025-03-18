import dayjs from 'dayjs'
import { PrismaClient } from '@prisma/client'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { ISummaryService } from '@/backend/services/interfaces/ISummaryService'
import { SummaryItemCreate } from '@/app/(types)/SummaryItem'

dayjs.extend(customParseFormat)

class SummaryService implements ISummaryService {
    constructor(private prisma: PrismaClient) {}

    async getSummaryByYear(year: string = '2025') {
        const data = await this.prisma.summary.findMany({
            where: {
                year,
            },
        })

        return data
    }

    async createSummary(year: string, item: SummaryItemCreate) {
        const summary = await this.prisma.summary.create({
            data: {
                year,
                cuenta: item.NO_CUENTA,
                cliente: item.NOMBRE_CLIENTE,
                depositos: item.DEPOSITOS,
                retiros: item.RETIROS,
                saldo: item.SALDO_FINAL,
                fecha: dayjs(item.FECHA_CORTE, 'DD/MM/YYYY').toDate(),
                extra: {
                    periodo: {
                        inicio: dayjs(item.PERIODO.inicio, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                        fin: dayjs(item.PERIODO.fin, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    },
                    moneda: item.MONEDA,
                },
            },
        })

        return summary
    }
}

export default SummaryService
