import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const config = {
    responsive: true,
    scales: {
        x: {
            ticks: {
                color: 'white',
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.2)',
            },
        },
        y: {
            ticks: {
                color: 'white',
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.2)',
            },
        },
    },
    plugins: {
        legend: {
            position: 'top' as const,
            labels: {
                color: 'white',
            },
        },
        title: {
            display: true,
            text: 'Depósitos y Retiros',
            color: 'white',
            font: {
                size: 18,
            },
        },
    },
}

const SummaryGraph = ({ data }: { data: any }) => {
    return <Line data={data!} options={config} />
}

export default SummaryGraph
