import {useMemo, useState} from 'react';
import {useSnackbar} from '../context/SnackbarContext';
import {useGetPortfolioQuery} from '../store/portfolioApi';
import {
    useApproveTransactionMutation,
    useDeleteTransactionMutation,
    useGetTransactionsQuery,
} from '../store/transactionApi';
import {useAppSelector} from '../store/store';

export const transactionFilters = [
    {label: 'All', value: undefined},
    {label: 'Pending', value: 'pending'},
    {label: 'Approved', value: 'approved'},
    {label: 'Rejected', value: 'rejected'},
];

export const useTransactionList = () => {
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
    const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
    const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc'>('date_desc');
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    const {user} = useAppSelector(state => state.auth);
    const isAdmin = user?.role === 'admin';
    const {data: portfolioData, isLoading: isPortfolioLoading} = useGetPortfolioQuery(undefined, {
        skip: !isAdmin,
    });
    const societies = portfolioData?.portfolio ?? [];
    const [selectedOrgCode, setSelectedOrgCode] = useState<string | undefined>(undefined);
    const activeOrgCode = isAdmin ? selectedOrgCode ?? societies[0]?.org_code : undefined;
    const activeSociety =
        societies.find(item => item.org_code === activeOrgCode) ?? societies[0] ?? null;

    const query = useGetTransactionsQuery(
        {
            ...(statusFilter ? {status: statusFilter} : {}),
            ...(typeFilter ? {type: typeFilter} : {}),
            ...(activeOrgCode ? {orgCode: activeOrgCode} : {}),
            ...(startDate ? {start_date: startDate.toISOString().split('T')[0]} : {}),
            ...(endDate ? {end_date: endDate.toISOString().split('T')[0]} : {}),
            sort_by: sortBy,
        },
        {
            skip: isAdmin && !activeOrgCode,
        },
    );
    const [approveTransaction, approvalState] = useApproveTransactionMutation();
    const [deleteTransaction, deletionState] = useDeleteTransactionMutation();
    const {show: showSnackbar} = useSnackbar();

    // Grouping logic
    const groupedTransactions = useMemo(() => {
        let transactions = [...(query.data?.data?.data || [])];
        
        // Local filtering as a safety measure if API doesn't support it fully
        if (statusFilter) {
            transactions = transactions.filter(t => t.status === statusFilter);
        }
        if (typeFilter) {
            transactions = transactions.filter(t => t.type === typeFilter);
        }
        if (startDate) {
            const start = startDate.toISOString().split('T')[0];
            transactions = transactions.filter(t => t.transaction_date >= start);
        }
        if (endDate) {
            const end = endDate.toISOString().split('T')[0];
            transactions = transactions.filter(t => t.transaction_date <= end);
        }

        // Sorting
        transactions.sort((a, b) => {
            if (sortBy === 'amount_desc') return parseFloat(b.amount) - parseFloat(a.amount);
            if (sortBy === 'amount_asc') return parseFloat(a.amount) - parseFloat(b.amount);
            if (sortBy === 'date_asc') return a.transaction_date.localeCompare(b.transaction_date);
            return b.transaction_date.localeCompare(a.transaction_date);
        });

        const groups: Record<string, any[]> = {};

        transactions.forEach(t => {
            const date = t.transaction_date;
            if (!groups[date]) groups[date] = [];
            groups[date].push(t);
        });

        // The order of keys in groups follows the sorted transactions' first occurrence
        // But for clarity, we rebuild the list based on sorted dates if sorting by date
        const sortedDates = Object.keys(groups).sort((a, b) => {
            return sortBy === 'date_asc' ? a.localeCompare(b) : b.localeCompare(a);
        });

        return sortedDates.map(date => ({
            title: date,
            data: groups[date],
        }));
    }, [query.data, sortBy, statusFilter, typeFilter, startDate, endDate]);

    const handleDecision = async (id: number, status: 'approved' | 'rejected') => {
        try {
            const response = await approveTransaction({
                id,
                status,
                ...(activeOrgCode ? {orgCode: activeOrgCode} : {}),
            }).unwrap();
            showSnackbar(response.message, 'success');
        } catch (approvalError: any) {
            showSnackbar(approvalError?.data?.message || 'Unable to update transaction.', 'error');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await deleteTransaction({
                id,
                ...(activeOrgCode ? {orgCode: activeOrgCode} : {}),
            }).unwrap();
            showSnackbar(response.message, 'success');
        } catch (error: any) {
            showSnackbar(error?.data?.message || 'Unable to delete transaction.', 'error');
        }
    };

    return {
        ...query,
        user,
        statusFilter,
        setStatusFilter,
        typeFilter,
        setTypeFilter,
        sortBy,
        setSortBy,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        groupedTransactions,
        societies,
        activeSociety,
        activeOrgCode,
        setSelectedOrgCode,
        handleDecision,
        handleDelete,
        isUpdating: approvalState.isLoading || deletionState.isLoading,
        isAdmin,
        isPortfolioLoading,
    };
};
