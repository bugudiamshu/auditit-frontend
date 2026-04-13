// src/store/portfolioApi.ts
import { baseApi } from './baseApi';
import { SocietySnapshot } from './dashboardApi';

interface PortfolioResponse {
    success: boolean;
    portfolio: SocietySnapshot[];
}

export const portfolioApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPortfolio: builder.query<PortfolioResponse, void>({
            query: () => ({
                url: '/societies',
                method: 'GET',
            }),
            providesTags: ['Portfolio'],
        }),
    }),
});

export const { useGetPortfolioQuery } = portfolioApi;
