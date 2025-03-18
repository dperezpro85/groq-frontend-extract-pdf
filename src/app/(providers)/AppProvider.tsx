'use client'

import { ConfigProvider, theme } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
})

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                algorithm: [theme.compactAlgorithm],
                token: {
                    colorPrimary: '#212121',
                    colorLink: '#212121',
                },
                components: {
                    Layout: {
                        bodyBg: '#212121',
                        headerBg: '#212121',
                    },
                    Upload: {
                        colorPrimaryHover: 'Green',
                        colorBorder: '#212121',
                    },
                },
            }}
        >
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ConfigProvider>
    )
}

export default AppProvider
