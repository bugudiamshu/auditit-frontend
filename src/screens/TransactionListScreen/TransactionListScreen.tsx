import React, {useState} from 'react';
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View,} from 'react-native';
import {useApproveTransactionMutation, useGetTransactionsQuery} from '../../store/transactionApi';
import {theme} from '../../config/theme';
import {useSnackbar} from '../../context/SnackbarContext';
import {TransactionListScreenStyles} from "./TransactionListScreenStyles.ts";
import {SafeAreaView} from "react-native-safe-area-context";
import AppHeader from "../../components/AppHeader.tsx";
import {useAppSelector} from "../../store/store.ts";

const TransactionListScreen = ({ navigation }: any) => {
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
    const { data, isLoading, isFetching, error, refetch } = useGetTransactionsQuery(
        statusFilter ? {status: statusFilter} : {}
    );
    const [approveTransaction, {isLoading: isUpdating}] = useApproveTransactionMutation();
    const { show: showSnackbar } = useSnackbar();
    const {user} = useAppSelector(state => state.auth);
    const isFounder = user?.role === 'founder';

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return theme.colors.success;
            case 'rejected': return theme.colors.danger;
            default: return theme.colors.warning;
        }
    };

    const handleDecision = async (id: number, status: 'approved' | 'rejected') => {
        try {
            const response = await approveTransaction({id, status}).unwrap();
            showSnackbar(response.message, 'success');
        } catch (approvalError: any) {
            showSnackbar(approvalError?.data?.message || 'Unable to update transaction.', 'error');
        }
    };

    const renderItem = ({ item }: any) => (
        <View style={TransactionListScreenStyles.card}>
            <View style={TransactionListScreenStyles.topRow}>
                <View style={TransactionListScreenStyles.titleBlock}>
                    <Text style={TransactionListScreenStyles.name}>{item.person_name}</Text>
                    <Text style={TransactionListScreenStyles.metaText}>
                        {item.creator?.name ? `Created by ${item.creator.name}` : item.payment_mode}
                    </Text>
                </View>
                <View style={[TransactionListScreenStyles.badge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={TransactionListScreenStyles.badgeText}>{item.status.toUpperCase()}</Text>
                </View>
            </View>

            <View style={TransactionListScreenStyles.bottomRow}>
                <View>
                    <Text style={TransactionListScreenStyles.date}>{item.transaction_date}</Text>
                    {item.remarks && (
                        <Text style={TransactionListScreenStyles.remarks} numberOfLines={1}>
                            {item.remarks}
                        </Text>
                    )}
                    {item.approver?.name ? (
                        <Text style={TransactionListScreenStyles.metaText}>
                            Approved by {item.approver.name}
                        </Text>
                    ) : null}
                </View>

                <Text style={[
                    TransactionListScreenStyles.amount,
                    { color: item.type === 'income' ? theme.colors.success : theme.colors.danger }
                ]}>
                    {item.type === 'income' ? '+' : '-'} ₹{parseFloat(item.amount).toLocaleString()}
                </Text>
            </View>

            {isFounder && item.status === 'pending' ? (
                <View style={TransactionListScreenStyles.actionRow}>
                    <TouchableOpacity
                        style={[TransactionListScreenStyles.actionButton, TransactionListScreenStyles.rejectButton]}
                        onPress={() => handleDecision(item.id, 'rejected')}
                        disabled={isUpdating}
                    >
                        <Text style={TransactionListScreenStyles.rejectButtonText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[TransactionListScreenStyles.actionButton, TransactionListScreenStyles.approveButton]}
                        onPress={() => handleDecision(item.id, 'approved')}
                        disabled={isUpdating}
                    >
                        <Text style={TransactionListScreenStyles.approveButtonText}>Approve</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );

    if (isLoading) {
        return (
            <View style={TransactionListScreenStyles.loader}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    const transactions = data?.data?.data || [];
    const filters = [
        {label: 'All', value: undefined},
        {label: 'Pending', value: 'pending'},
        {label: 'Approved', value: 'approved'},
        {label: 'Rejected', value: 'rejected'},
    ];

    return (
        <SafeAreaView style={TransactionListScreenStyles.container}>
            <AppHeader pageTitle={'Transactions'}/>

            <View style={TransactionListScreenStyles.titleContainer}>
                <Text style={TransactionListScreenStyles.title}>Transactions</Text>
                <Text style={TransactionListScreenStyles.subtitle}>
                    Review the latest ledger items and keep approvals moving.
                </Text>
            </View>

            <View style={TransactionListScreenStyles.filtersRow}>
                {filters.map(filter => {
                    const isActive = filter.value === statusFilter || (!filter.value && !statusFilter);
                    return (
                        <TouchableOpacity
                            key={filter.label}
                            style={[
                                TransactionListScreenStyles.filterChip,
                                isActive && TransactionListScreenStyles.filterChipActive,
                            ]}
                            onPress={() => setStatusFilter(filter.value)}
                        >
                            <Text
                                style={[
                                    TransactionListScreenStyles.filterChipText,
                                    isActive && TransactionListScreenStyles.filterChipTextActive,
                                ]}
                            >
                                {filter.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {error ? (
                <View style={TransactionListScreenStyles.emptyState}>
                    <Text style={TransactionListScreenStyles.emptyTitle}>Could not load transactions</Text>
                    <TouchableOpacity onPress={refetch}>
                        <Text style={TransactionListScreenStyles.retryText}>Tap to retry</Text>
                    </TouchableOpacity>
                </View>
            ) : null}

            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={TransactionListScreenStyles.list}
                showsVerticalScrollIndicator={false}
                onRefresh={refetch}
                refreshing={isFetching}
                ListEmptyComponent={
                    !error ? (
                        <View style={TransactionListScreenStyles.emptyState}>
                            <Text style={TransactionListScreenStyles.emptyTitle}>No transactions yet</Text>
                            <Text style={TransactionListScreenStyles.emptySubtitle}>
                                Create a new entry to start building the ledger.
                            </Text>
                        </View>
                    ) : null
                }
            />

            <TouchableOpacity
                style={TransactionListScreenStyles.fab}
                onPress={() => navigation.navigate('TransactionEntry')}
                activeOpacity={0.8}
            >
                <Text style={TransactionListScreenStyles.fabIcon}>＋</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default TransactionListScreen;
