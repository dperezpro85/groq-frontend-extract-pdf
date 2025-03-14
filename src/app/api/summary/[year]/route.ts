import { NextRequest, NextResponse } from 'next/server'

import logger from '@/infrastructure/logger/logger'
import { createServices } from '@/services/factory'

const { summaryService } = createServices()

export async function GET(request: NextRequest, { params }: { params: Promise<{ year: string }> }) {
    if (request.method !== 'GET') {
        return NextResponse.json({ message: 'Method not allowed' })
    }

    const { year = '2025' } = await params

    logger.info(`API request received for year: ${year}`)

    try {
        const data = await summaryService.getSummaryByYear(year)
        return NextResponse.json({
            data,
            message: 'Summary data',
        })
    } catch (error: any) {
        logger.info(`❌ Error fetching data: ${error}`)
        return NextResponse.json(
            { message: 'Error fetching data:' + error?.message! },
            {
                status: 500,
            }
        )
    }
}
