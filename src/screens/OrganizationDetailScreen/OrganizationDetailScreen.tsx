import React from 'react';
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';
import FeedbackState from '../../components/common/FeedbackState';
import {theme} from '../../config/theme';
import {useGetSocietyDetailsQuery} from '../../store/dashboardApi';
import {formatCurrency} from '../../utils/formatters';
import TransactionCard from '../TransactionListScreen/components/TransactionCard';
import {OrganizationDetailStyles} from './OrganizationDetailScreenStyles';

const OrganizationDetailScreen = ({route, navigation}: any) => {
    const {id, name} = route.params;
    const {data, isLoading, error, refetch} = useGetSocietyDetailsQuery(id);

    if (isLoading) {
        return (
            <SafeAreaView style={OrganizationDetailStyles.loader}>
                <AppHeader />
                <ActivityIndicator size="large" color={theme.colors.primary} style={{flex: 1}} />
            </SafeAreaView>
        );
    }

    if (error || !data) {
        return (
            <SafeAreaView style={OrganizationDetailStyles.container}>
                <AppHeader />
                <View style={OrganizationDetailStyles.header}>
                    <TouchableOpacity
                        style={OrganizationDetailStyles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={OrganizationDetailStyles.backText}>← Back to Portfolio</Text>
                    </TouchableOpacity>
                </View>
                <FeedbackState
                    centered
                    title="Could not load details"
                    description="We were unable to fetch the transactions for this organization."
                    actionLabel="Try again"
                    onAction={refetch}
                />
                <AppFooter navigation={navigation} />
            </SafeAreaView>
        );
    }

    const {snapshot, transactions} = data;

    const handlePressTransaction = (item: any) => {
        navigation.navigate('TransactionDetail', {
            transaction: item,
            orgCode: snapshot.org_code,
        });
    };

    return (
        <SafeAreaView style={OrganizationDetailStyles.container} edges={['top']}>
            <AppHeader />
            
            <View style={OrganizationDetailStyles.subHeader}>
                <TouchableOpacity
                    style={OrganizationDetailStyles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={OrganizationDetailStyles.backText}>← Back to Portfolio</Text>
                </TouchableOpacity>

                <View style={OrganizationDetailStyles.titleRow}>
                    <View style={[OrganizationDetailStyles.orgColorBadge, {backgroundColor: snapshot.primary_color}]} />
                    <View>
                        <Text style={OrganizationDetailStyles.orgTitle}>{snapshot.name}</Text>
                        <Text style={OrganizationDetailStyles.orgSubtitle}>
                            {snapshot.org_code} • {snapshot.total_users} active users
                        </Text>
                    </View>
                </View>
            </View>

            <FlatList
                ListHeaderComponent={
                    <View style={OrganizationDetailStyles.statsSection}>
                        <View style={OrganizationDetailStyles.statsGrid}>
                            <View style={[OrganizationDetailStyles.statCard, OrganizationDetailStyles.statCardWide]}>
                                <Text style={OrganizationDetailStyles.statLabel}>Net Portfolio Value</Text>
                                <Text style={[OrganizationDetailStyles.statValue, {fontSize: 24}]}>
                                    {formatCurrency(snapshot.net_total)}
                                </Text>
                                <Text style={OrganizationDetailStyles.statCount}>
                                    From {snapshot.total_transactions} total entries
                                </Text>
                            </View>

                            <View style={OrganizationDetailStyles.statCard}>
                                <Text style={OrganizationDetailStyles.statLabel}>Pending Income</Text>
                                <Text style={OrganizationDetailStyles.statValue}>
                                    {formatCurrency(snapshot.pending_income)}
                                </Text>
                                <Text style={OrganizationDetailStyles.statCount}>
                                    {snapshot.pending_income_count} items waiting
                                </Text>
                            </View>

                            <View style={OrganizationDetailStyles.statCard}>
                                <Text style={OrganizationDetailStyles.statLabel}>Pending Expense</Text>
                                <Text style={OrganizationDetailStyles.statValue}>
                                    {formatCurrency(snapshot.pending_expense)}
                                </Text>
                                <Text style={OrganizationDetailStyles.statCount}>
                                    {snapshot.pending_expense_count} items waiting
                                </Text>
                            </View>

                            <View style={OrganizationDetailStyles.statCard}>
                                <Text style={OrganizationDetailStyles.statLabel}>Total Income</Text>
                                <Text style={[OrganizationDetailStyles.statValue, {color: theme.colors.success}]}>
                                    {formatCurrency(snapshot.income_total)}
                                </Text>
                            </View>

                            <View style={OrganizationDetailStyles.statCard}>
                                <Text style={OrganizationDetailStyles.statLabel}>Total Expense</Text>
                                <Text style={[OrganizationDetailStyles.statValue, {color: theme.colors.danger}]}>
                                    {formatCurrency(snapshot.expense_total)}
                                </Text>
                            </View>
                        </View>
                        
                        <View style={OrganizationDetailStyles.sectionHeader}>
                            <Text style={OrganizationDetailStyles.sectionTitle}>Transaction History</Text>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('MainApp', { 
                                    screen: 'TransactionsTab', 
                                    params: { orgCode: snapshot.org_code } 
                                })}
                            >
                                <Text style={{fontSize: 13, fontWeight: '700', color: theme.colors.primary}}>View Full Ledger</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                data={transactions.data}
                renderItem={({item}) => (
                    <View style={{paddingHorizontal: 16}}>
                        <TransactionCard
                            item={item}
                            isAdmin={true}
                            isUpdating={false}
                            onPress={() => handlePressTransaction(item)}
                        />
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={OrganizationDetailStyles.listContent}
                showsVerticalScrollIndicator={false}
                onRefresh={refetch}
                refreshing={isLoading}
                ListEmptyComponent={
                    <View style={{paddingHorizontal: 24}}>
                        <FeedbackState
                            title="No transactions found"
                            description="This organization doesn't have any recorded transactions yet."
                        />
                    </View>
                }
            />
            
            <AppFooter navigation={navigation} />
        </SafeAreaView>
    );
};

export default OrganizationDetailScreen;
