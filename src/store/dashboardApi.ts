import { baseApi } from './baseApi';

/**
 * Dashboard API for fetching summary data and metrics.
 * Injects into baseApi for unified RTK Query management.
 */
export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardSummary: builder.query<any, void>({
            query: () => '/dashboard/summary',
            providesTags: ['Dashboard'],
        }),
    }),
});

export const { useGetDashboardSummaryQuery } = dashboardApi;
