import { baseApi } from './baseApi';

export interface DashboardActivity {
    id: number;
    type: 'income' | 'expense';
    status: 'pending' | 'approved' | 'rejected';
    title: string;
    amount: number;
    payment_mode: 'cash' | 'online';
    reference_no: string | null;
    remarks: string | null;
    transaction_date: string;
    created_at: string | null;
    created_by: string | null;
    approved_by: string | null;
    document_url: string | null;
    document_type: string | null;
}

export interface TenantMetricSummary {
    income_total: number;
    expense_total: number;
    net_total: number;
    total_transactions: number;
    pending_transactions: number;
    approved_transactions: number;
    rejected_transactions: number;
    pending_amount: number;
    approved_amount: number;
    pending_income: number;
    pending_expense: number;
    total_users: number;
    admins: number;
    incharges: number;
    can_approve: boolean;
    recent_activity: DashboardActivity[];
}

export interface SocietySnapshot {
    id: number;
    name: string;
    org_code: string;
    primary_color: string;
    db_name: string;
    total_users: number;
    total_transactions: number;
    pending_transactions: number;
    approved_transactions: number;
    rejected_transactions: number;
    income_total: number;
    expense_total: number;
    net_total: number;
    pending_amount: number;
    approved_amount: number;
    pending_income: number;
    pending_expense: number;
    pending_income_count: number;
    pending_expense_count: number;
    last_transaction_at: string | null;
}

export interface CentralSummary {
    total_societies: number;
    total_transactions: number;
    pending_approvals: number;
    active_users: number;
    income_total: number;
    expense_total: number;
    net_total: number;
    pending_amount: number;
    pending_income: number;
    pending_expense: number;
    societies: SocietySnapshot[];
}

export interface DashboardResponse {
    success: boolean;
    role: string;
    view: 'central' | 'tenant';
    organization?: {
        name: string;
        org_code: string;
        primary_color: string;
    } | null;
    summary?: CentralSummary;
    metrics?: TenantMetricSummary;
}

export interface SocietyDetailsResponse {
    success: boolean;
    snapshot: SocietySnapshot;
    transactions: {
        data: DashboardActivity[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardSummary: builder.query<DashboardResponse, void>({
            query: () => '/dashboard/summary',
            providesTags: ['Dashboard'],
        }),
        getSocietyDetails: builder.query<SocietyDetailsResponse, number>({
            query: (id) => `/societies/${id}`,
            providesTags: (result, error, id) => [{ type: 'Dashboard', id }],
        }),
    }),
});

export const { useGetDashboardSummaryQuery, useGetSocietyDetailsQuery } = dashboardApi;
