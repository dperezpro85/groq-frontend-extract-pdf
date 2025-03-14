import { SummaryItemCreate } from '@/types/SummaryItem';

export interface ISummaryService {
    getSummaryByYear(year: string): Promise<any>;
    createSummary(year: string, item: SummaryItemCreate): Promise<any>;
}