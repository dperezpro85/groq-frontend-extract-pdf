import dayjs from 'dayjs'
import { QueryFunction, useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { Results, SummaryItem } from '@/app/(types)/SummaryItem'

interface ChartData {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        borderColor: string
        backgroundColor: string
    }[]
}

type SummaryQueryKey = readonly ['summary', { year: string }]

const getSummaryByYear: QueryFunction<Results<SummaryItem[]>, SummaryQueryKey> = async ({
    signal,
    queryKey,
}): Promise<Results<SummaryItem[]>> => {
    const [_key, options] = queryKey
    const response = await fetch(`/api/${_key}/${options.year}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        signal,
    })

    if (!response.ok) {
        throw new Error('❌ Error en la API')
    }

    return response.json()
}

const handleSelect = (result: Results<SummaryItem[]>): ChartData => {
    const data = result.data || []

    const sortedData = data.sort((a: SummaryItem, b: SummaryItem) => {
        return dayjs(a.fecha).isAfter(dayjs(b.fecha)) ? 1 : -1
    })

    return {
        labels: sortedData.map((item: SummaryItem) => dayjs(item.fecha).format('DD/MM/YYYY')),
        datasets: [
            {
                label: 'Depósitos',
                data: sortedData.map((item: SummaryItem) => item.depositos),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Retiros',
                data: sortedData.map((item: SummaryItem) => item.retiros),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    }
}

const api = {
    useGetSummary: {
        useQuery: (
            options: { year: string },
            queryOptions?: Omit<
                UseQueryOptions<Results<SummaryItem[]>, Error, ChartData, SummaryQueryKey>,
                'queryKey' | 'queryFn' | 'select'
            >
        ): UseQueryResult<ChartData, Error> => {
            return useQuery<Results<SummaryItem[]>, Error, ChartData, SummaryQueryKey>({
                queryKey: ['summary', options] as const,
                queryFn: getSummaryByYear,
                select: handleSelect,
                ...queryOptions,
            })
        },
    },
}

export default api
