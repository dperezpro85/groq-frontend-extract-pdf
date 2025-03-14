import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { SummaryItem } from '@/types/SummaryItem'

const api = {
    useGetSummary: {
        useQuery: (options: Record<string, any> = {}) => {
            return useQuery({
                queryKey: ['summary', options],
                queryFn: async ({signal}) => {
                    const response = await fetch(`/api/summary/${options.year}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        signal
                    })
                    
                    if (!response.ok) {
                        throw new Error('❌ Error en la API')
                    }

                    const { data = [] } = await response.json()

                    return data
                },
                select: (data) => {
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
                },
            })
        },
    },
}

export default api
