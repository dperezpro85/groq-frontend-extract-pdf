import prisma from '@/libs/prisma'
import SummaryService from '@/services/SummaryService';
import { ISummaryService } from '@/services/interfaces/ISummaryService';
import { SummaryItemCreate } from '@/types/SummaryItem';


export class SummaryServiceAdapter implements ISummaryService {
    private summaryService: SummaryService;

    constructor() {
        this.summaryService = new SummaryService(prisma);
    }

    getSummaryByYear(year: string) {
        return this.summaryService.getSummaryByYear(year);
    }

    createSummary(year: string, item: SummaryItemCreate) {
        return this.summaryService.createSummary(year, item);
    }
}