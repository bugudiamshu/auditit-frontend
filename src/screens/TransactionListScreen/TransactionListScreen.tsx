import React from 'react';
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View,} from 'react-native';
import {useGetTransactionsQuery} from '../../store/transactionApi';
import {theme} from '../../config/theme';
import {useSnackbar} from '../../context/SnackbarContext';
import {TransactionListScreenStyles} from "./TransactionListScreenStyles.ts";
import {SafeAreaView} from "react-native-safe-area-context";
import AppHeader from "../../components/AppHeader.tsx";
import {TransactionStyles} from "../TransactionEntryScreen/TransactionStyles.ts"; // Import useSnackbar

const TransactionListScreen = ({ navigation }: any) => {
    const { data, isLoading, error, refetch } = useGetTransactionsQuery({});
    const { show: showSnackbar } = useSnackbar();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return theme.colors.success;
            case 'rejected': return theme.colors.danger;
            default: return theme.colors.warning;
        }
    };

    const renderItem = ({ item }: any) => (
        <View style={TransactionListScreenStyles.card}>
            <View style={TransactionListScreenStyles.topRow}>
                <Text style={TransactionListScreenStyles.name}>{item.person_name}</Text>
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
                </View>

                <Text style={[
                    TransactionListScreenStyles.amount,
                    { color: item.type === 'income' ? theme.colors.success : theme.colors.danger }
                ]}>
                    {item.type === 'income' ? '+' : '-'} ₹{parseFloat(item.amount).toLocaleString()}
                </Text>
            </View>
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

    return (
        <SafeAreaView style={TransactionListScreenStyles.container}>
            <AppHeader navigation={navigation} pageTitle={'Transactions'}/>

            {/* Title */}
            <View style={TransactionListScreenStyles.titleContainer}>
                <Text style={TransactionListScreenStyles.title}>Transactions</Text>
            </View>

            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={TransactionListScreenStyles.list}
                showsVerticalScrollIndicator={false}
                onRefresh={refetch}
                refreshing={isLoading}
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
