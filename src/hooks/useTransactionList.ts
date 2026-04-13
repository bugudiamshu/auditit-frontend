import {useState} from 'react';
import {useSnackbar} from '../context/SnackbarContext';
import {useGetPortfolioQuery} from '../store/portfolioApi';
import {
    useApproveTransactionMutation,
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
    const {user} = useAppSelector(state => state.auth);
    const isFounder = user?.role === 'founder';
    const {data: portfolioData, isLoading: isPortfolioLoading} = useGetPortfolioQuery(undefined, {
        skip: !isFounder,
    });
    const societies = portfolioData?.portfolio ?? [];
    const [selectedOrgCode, setSelectedOrgCode] = useState<string | undefined>(undefined);
    const activeOrgCode = isFounder ? selectedOrgCode ?? societies[0]?.org_code : undefined;
    const activeSociety =
        societies.find(item => item.org_code === activeOrgCode) ?? societies[0] ?? null;

    const query = useGetTransactionsQuery(
        {
            ...(statusFilter ? {status: statusFilter} : {}),
            ...(activeOrgCode ? {orgCode: activeOrgCode} : {}),
        },
        {
            skip: isFounder && !activeOrgCode,
        },
    );
    const [approveTransaction, approvalState] = useApproveTransactionMutation();
    const {show: showSnackbar} = useSnackbar();

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

    return {
        ...query,
        statusFilter,
        setStatusFilter,
        societies,
        activeSociety,
        activeOrgCode,
        setSelectedOrgCode,
        handleDecision,
        isUpdating: approvalState.isLoading,
        isFounder,
        isPortfolioLoading,
    };
};
