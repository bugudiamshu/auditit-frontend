// src/store/portfolioApi.ts
import { baseApi } from './baseApi';

// Define the structure for a society/portfolio item
interface Society {
    id: string;
    org_code: string;
    name: string;
    branches: number;
    primary_color: string;
    // Add other properties as needed
}

interface PortfolioResponse {
    success: boolean;
    portfolio: Society[];
}

export const portfolioApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPortfolio: builder.query<PortfolioResponse, void>({
            query: () => ({
                url: '/societies', // Assuming an endpoint like /societies exists for fetching portfolios
                method: 'GET',
            }),
            providesTags: ['Portfolio'], // Tag for caching and invalidation
        }),
    }),
});

export const { useGetPortfolioQuery } = portfolioApi;
