import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View,} from 'react-native';
import {useGetTransactionsQuery} from '../../store/transactionApi';
import {theme} from '../../config/theme';
import {useSnackbar} from '../../context/SnackbarContext';
import {TransactionListScreenStyles} from "./TransactionListScreenStyles.ts"; // Import useSnackbar

const TransactionListScreen = ({ navigation }: any) => {
    const { data, isLoading, error, refetch } = useGetTransactionsQuery({});
    const { show: showSnackbar } = useSnackbar(); // Get show Snackbar function

    // Memoize renderItem function for FlatList optimization
    const renderItem = useCallback(({ item }: any) => (
        <View style={TransactionListScreenStyles.card}>
            <View style={TransactionListScreenStyles.cardHeader}>
                <Text style={TransactionListScreenStyles.personName}>{item.person_name}</Text>
                <View style={[TransactionListScreenStyles.badge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={TransactionListScreenStyles.badgeText}>{item.status.toUpperCase()}</Text>
                </View>
            </View>
            <View style={TransactionListScreenStyles.cardBody}>
                <Text style={TransactionListScreenStyles.date}>{item.transaction_date}</Text>
                <Text style={[TransactionListScreenStyles.amount, { color: item.type === 'income' ? theme.colors.success : theme.colors.danger }]}>
                    {item.type === 'income' ? '+' : '-'} ₹{parseFloat(item.amount).toLocaleString()}
                </Text>
            </View>
            {item.remarks && (
                <Text style={TransactionListScreenStyles.remarks} numberOfLines={1}>{item.remarks}</Text>
            )}
        </View>
    ), []); // No dependencies, function is stable

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return theme.colors.success;
            case 'rejected': return theme.colors.danger;
            default: return theme.colors.warning;
        }
    };

    // Handle API errors using Snackbar
    useEffect(() => {
        if (error) {
            console.error("Transactions loading error:", error);
            let errorMessage = 'Failed to load transactions. Please try again.';
            if (error.data && typeof error.data.message === 'string') {
                errorMessage = error.data.message;
            } else if (error.status === 'FETCH_ERROR') {
                errorMessage = 'Network error. Please check your connection.';
            }
            showSnackbar(errorMessage, 'error');
        }
    }, [error, showSnackbar]);

    // Memoize navigation handler
    const navigateBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    if (isLoading) {
        return (
            <View style={TransactionListScreenStyles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    const transactions = data?.data?.data || [];

    return (
        <SafeAreaView style={TransactionListScreenStyles.container}>
            <View style={TransactionListScreenStyles.header}>
                <TouchableOpacity onPress={navigateBack} style={TransactionListScreenStyles.backButton}>
                    <Text style={TransactionListScreenStyles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Text style={TransactionListScreenStyles.title}>Transactions</Text>
            </View>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={TransactionListScreenStyles.listContent}
                onRefresh={refetch}
                refreshing={isLoading} // Use isLoading to reflect initial load state for refreshing
            />
        </SafeAreaView>
    );
};

export default TransactionListScreen;
