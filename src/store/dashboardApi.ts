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

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardSummary: builder.query<DashboardResponse, void>({
            query: () => '/dashboard/summary',
            providesTags: ['Dashboard'],
        }),
    }),
});

export const { useGetDashboardSummaryQuery } = dashboardApi;
