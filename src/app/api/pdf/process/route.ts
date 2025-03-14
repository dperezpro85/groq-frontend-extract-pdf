import fs from 'fs/promises'
import path from 'path'
import pdf from 'pdf-parse'
import { NextResponse, NextRequest } from 'next/server'

import logger from '@/infrastructure/logger/logger'
import { createServices } from '@/services/factory'

const { summaryService, groqService } = createServices()

/**
 * Extracts text from a PDF file.
 * @param filePath
 * @returns
 */
const getInfoOfFile = async (filePath: string) => {
    const dataBuffer = await fs.readFile(filePath)
    const { text } = await pdf(dataBuffer)

    return text
}

/**
 * POST /api/process_pdf
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
    if (request.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' })
    }

    const body = await request.json()
    const { year } = body

    const output = []

    try {
        const resourcesDir = path.join(process.cwd(), `/bucket/${year}`)
        const files = await fs.readdir(resourcesDir)

        for (const file of files) {
            if (path.extname(file) === '.pdf') {
                const filePath = path.join(resourcesDir, file)
                const info = await getInfoOfFile(filePath)
                logger.info(`📄 Pdf extract info: ${info}`)

                const results = await groqService.completions(info)
                logger.info(`📄 Groq ${file} processed: ${results}`)

                let parsedResults: object | null = null
                try {
                    parsedResults = JSON.parse(results!)
                } catch (error) {
                    logger.error(`❌ Error parsing JSON: ${error}`)
                }

                if (parsedResults) {
                    const item = await summaryService.createSummary(year, JSON.parse(results!) || {})
                    output.push(item)
                }
            }
        }

        return NextResponse.json({ data: output }, { status: 200 })
    } catch (error: any) {
        logger.error(`❌ Error processing PDFs: ${error}`)
        return NextResponse.json({ message: 'Error processing PDFs:' + error?.message! }, { status: 500 })
    }
}
