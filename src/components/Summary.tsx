import React, { useState } from 'react'
import { Button, Flex, Layout, Select } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

import api from '@/hooks/useGetSummary'
import SummaryGraph from '@/components/SummaryGraph'

const yearOptions = Array.from({ length: 3 }, (_, i) => {
    const year = 2023 + i
    return { label: year.toString(), value: year }
})

const Summary: React.FC = () => {
    const [year, setYear] = useState<number>(2024)
    const querySummary = api.useGetSummary.useQuery({ year })

    return (
        <Layout className="SummaryLayout h-full">
            <Layout.Header>
                <Flex className="h-full" justify="space-between" align="center">
                    <h1 className="text-white text-2xl m-0">Resumen {year}</h1>
                    <div className="flex items-center gap-4">
                        <Select
                            defaultValue={year}
                            onChange={(value) => setYear(value)}
                            placeholder="Selecciona un año"
                            options={yearOptions}
                            style={{ width: 200 }}
                        />
                        <Button
                            loading={querySummary.isFetching}
                            className="text-white"
                            onClick={() => querySummary.refetch()}
                            icon={<SyncOutlined />}
                        />
                    </div>
                </Flex>
            </Layout.Header>
            <Layout.Content className="px-6">
                {querySummary.isLoading ? <div>Cargando...</div> : querySummary.isSuccess && <SummaryGraph data={querySummary.data} />}
            </Layout.Content>
        </Layout>
    )
}

export default Summary
