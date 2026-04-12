import { baseApi } from './baseApi';

/**
 * Transaction API for handling income/expense entries and approvals.
 * Injects into baseApi for unified RTK Query management.
 */
export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query<any, { status?: string }>({
            query: (params) => ({
                url: '/transactions',
                params,
            }),
            providesTags: ['Transactions'],
        }),
        createTransaction: builder.mutation({
            query: (data) => ({
                url: '/transactions',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Transactions', 'Dashboard'],
        }),
        approveTransaction: builder.mutation({
            query: ({ id, status }) => ({
                url: `/transactions/${id}/approve`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Transactions', 'Dashboard'],
        }),
    }),
});

export const { 
    useGetTransactionsQuery, 
    useCreateTransactionMutation, 
    useApproveTransactionMutation 
} = transactionApi;
