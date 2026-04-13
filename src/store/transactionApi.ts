import { baseApi } from './baseApi';

export interface TransactionRecord {
    id: number;
    type: 'income' | 'expense';
    transaction_date: string;
    reference_no: string | null;
    payment_mode: 'cash' | 'online';
    transaction_id: string | null;
    person_name: string;
    amount: string;
    remarks: string | null;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    creator?: { id: number; name: string } | null;
    approver?: { id: number; name: string } | null;
}

interface PaginatedTransactions {
    data: TransactionRecord[];
}

interface TransactionListResponse {
    success: boolean;
    data: PaginatedTransactions;
}

interface TransactionMutationResponse {
    success: boolean;
    message: string;
    transaction: TransactionRecord;
}

type TransactionQueryParams = {
    status?: string;
    orgCode?: string;
};

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query<TransactionListResponse, TransactionQueryParams>({
            query: ({orgCode, ...params}) => ({
                url: '/transactions',
                params,
                headers: orgCode ? {'X-Organization-Code': orgCode} : undefined,
            }),
            providesTags: ['Transactions'],
        }),
        createTransaction: builder.mutation<TransactionMutationResponse, Record<string, unknown>>({
            query: (data) => ({
                url: '/transactions',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Transactions', 'Dashboard'],
        }),
        updateTransaction: builder.mutation<
            TransactionMutationResponse,
            { id: number; data: Record<string, unknown>; orgCode?: string }
        >({
            query: ({ id, data, orgCode }) => ({
                url: `/transactions/${id}`,
                method: 'PATCH',
                body: data,
                headers: orgCode ? {'X-Organization-Code': orgCode} : undefined,
            }),
            invalidatesTags: ['Transactions', 'Dashboard'],
        }),
        deleteTransaction: builder.mutation<
            { success: boolean; message: string },
            { id: number; orgCode?: string }
        >({
            query: ({ id, orgCode }) => ({
                url: `/transactions/${id}`,
                method: 'DELETE',
                headers: orgCode ? {'X-Organization-Code': orgCode} : undefined,
            }),
            invalidatesTags: ['Transactions', 'Dashboard'],
        }),
        approveTransaction: builder.mutation<
            TransactionMutationResponse,
            { id: number; status: 'approved' | 'rejected'; orgCode?: string }
        >({
            query: ({ id, status, orgCode }) => ({
                url: `/transactions/${id}/approve`,
                method: 'PATCH',
                body: { status },
                headers: orgCode ? {'X-Organization-Code': orgCode} : undefined,
            }),
            invalidatesTags: ['Transactions', 'Dashboard'],
        }),
    }),
});

export const { 
    useGetTransactionsQuery, 
    useCreateTransactionMutation, 
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,
    useApproveTransactionMutation 
} = transactionApi;
