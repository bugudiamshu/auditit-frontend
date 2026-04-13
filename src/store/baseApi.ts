import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from './baseQuery';

/**
 * The base API serves as the centralized hub for RTK Query in AuditIt.
 * We use code-splitting (injectEndpoints) for modularity.
 */
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: apiBaseQuery,
    endpoints: () => ({}), // Endpoints will be injected by other slices
    tagTypes: ['Dashboard', 'Transactions', 'Portfolio']
});
