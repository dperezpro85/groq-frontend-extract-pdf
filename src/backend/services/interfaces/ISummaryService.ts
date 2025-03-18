import { SummaryItemCreate } from '@/app/(types)/SummaryItem'

export interface ISummaryService {
    getSummaryByYear(year: string): Promise<any>
    createSummary(year: string, item: SummaryItemCreate): Promise<any>
}
