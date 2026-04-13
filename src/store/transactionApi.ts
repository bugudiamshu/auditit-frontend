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

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query<TransactionListResponse, { status?: string }>({
            query: (params) => ({
                url: '/transactions',
                params,
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
        approveTransaction: builder.mutation<TransactionMutationResponse, { id: number; status: 'approved' | 'rejected' }>({
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
