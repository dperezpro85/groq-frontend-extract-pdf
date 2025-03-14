import GroqService from '@/services/GroqService'
import { SummaryServiceAdapter } from '@/adapters/SummaryServiceAdapter'
import { ISummaryService } from './interfaces/ISummaryService'

export function createServices() {
    const summaryService: ISummaryService = new SummaryServiceAdapter()
    const groqService = new GroqService()

    return {
        summaryService,
        groqService,
    }
}
