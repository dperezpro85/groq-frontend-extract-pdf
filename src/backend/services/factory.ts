import GroqService from '@/backend/services/GroqService'
import { SummaryServiceAdapter } from '@/backend/adapters/SummaryServiceAdapter'
import { ISummaryService } from './interfaces/ISummaryService'

export function createServices() {
    const summaryService: ISummaryService = new SummaryServiceAdapter()
    const groqService = new GroqService()

    return {
        summaryService,
        groqService,
    }
}
