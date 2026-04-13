import React from 'react';
import {RefreshControl, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import FeedbackState from '../../components/common/FeedbackState';
import {theme} from '../../config/theme';
import {useDashboardData} from '../../hooks/useDashboardData';
import {formatCompact, formatCurrency} from '../../utils/formatters';
import DashboardActivityRow from './components/DashboardActivityRow';
import DashboardMetricCard from './components/DashboardMetricCard';
import DashboardSocietyRow from './components/DashboardSocietyRow';
import {DashboardStyles} from './DashboardStyles';

const DashboardScreen = ({navigation}: any) => {
    const {data, isLoading, isFetching, error, refetch, user, isCentralView, tenantMetrics, centralSummary} =
        useDashboardData();

    if (isLoading) {
        return (
            <SafeAreaView style={DashboardStyles.container}>
                <AppHeader pageTitle="Dashboard" />
                <FeedbackState
                    centered
                    title="Loading dashboard..."
                    description="Pulling the latest finance and workflow data."
                />
            </SafeAreaView>
        );
    }

    if (error || !data?.success) {
        return (
            <SafeAreaView style={DashboardStyles.container}>
                <AppHeader pageTitle="Dashboard" />
                <FeedbackState
                    centered
                    title="Dashboard unavailable"
                    description="We could not load the current summary right now."
                    actionLabel="Try again"
                    onAction={refetch}
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={DashboardStyles.container}>
            <AppHeader pageTitle={isCentralView ? 'Founder Dashboard' : 'Dashboard'} />

            <ScrollView
                contentContainerStyle={DashboardStyles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={refetch}
                        tintColor={theme.colors.primary}
                    />
                }
                showsVerticalScrollIndicator={false}
            >
                <View style={DashboardStyles.heroCard}>
                    <Text style={DashboardStyles.heroEyebrow}>
                        {isCentralView ? 'Consolidated portfolio' : data.organization?.org_code ?? 'Live ledger'}
                    </Text>
                    <Text style={DashboardStyles.heroTitle}>
                        {isCentralView
                            ? 'Track every society from one place.'
                            : `Welcome back, ${user?.name?.split(' ')[0] ?? 'team'}.`}
                    </Text>
                    <Text style={DashboardStyles.heroSubtitle}>
                        {isCentralView
                            ? `${centralSummary?.total_societies ?? 0} active organizations with live approval visibility.`
                            : `${tenantMetrics?.pending_transactions ?? 0} transactions are waiting for action today.`}
                    </Text>
                </View>

                {isCentralView && centralSummary ? (
                    <>
                        <View style={DashboardStyles.metricGrid}>
                            <DashboardMetricCard
                                label="Portfolio Net"
                                value={formatCurrency(centralSummary.net_total)}
                                tone="success"
                                caption={`${formatCompact(centralSummary.total_transactions)} transactions`}
                            />
                            <DashboardMetricCard
                                label="Pending Amount"
                                value={formatCurrency(centralSummary.pending_amount)}
                                tone="warning"
                                caption={`${centralSummary.pending_approvals} approvals open`}
                            />
                            <DashboardMetricCard
                                label="Income"
                                value={formatCurrency(centralSummary.income_total)}
                                tone="success"
                                caption={`${centralSummary.active_users} active users`}
                            />
                            <DashboardMetricCard
                                label="Expense"
                                value={formatCurrency(centralSummary.expense_total)}
                                tone="danger"
                                caption={`${centralSummary.total_societies} societies`}
                            />
                        </View>

                        <Text style={DashboardStyles.sectionTitle}>Organizations</Text>
                        {centralSummary.societies.length ? (
                            centralSummary.societies.map(item => (
                                <DashboardSocietyRow key={item.id} item={item} />
                            ))
                        ) : (
                            <View style={DashboardStyles.emptyCard}>
                                <FeedbackState
                                    title="No organizations found"
                                    description="Add an active tenant to start seeing founder-level insights here."
                                />
                            </View>
                        )}
                    </>
                ) : null}

                {!isCentralView && tenantMetrics ? (
                    <>
                        <View style={DashboardStyles.metricGrid}>
                            <DashboardMetricCard
                                label="Net Balance"
                                value={formatCurrency(tenantMetrics.net_total)}
                                tone={tenantMetrics.net_total >= 0 ? 'success' : 'danger'}
                                caption={`${tenantMetrics.total_transactions} total transactions`}
                            />
                            <DashboardMetricCard
                                label="Pending Queue"
                                value={tenantMetrics.pending_transactions.toString()}
                                tone="warning"
                                caption={formatCurrency(tenantMetrics.pending_amount)}
                            />
                            <DashboardMetricCard
                                label="Income"
                                value={formatCurrency(tenantMetrics.income_total)}
                                tone="success"
                                caption={`${tenantMetrics.approved_transactions} approved`}
                            />
                            <DashboardMetricCard
                                label="Expense"
                                value={formatCurrency(tenantMetrics.expense_total)}
                                tone="danger"
                                caption={`${tenantMetrics.rejected_transactions} rejected`}
                            />
                        </View>

                        <Text style={DashboardStyles.sectionTitle}>Quick Actions</Text>
                        <View style={DashboardStyles.actionRow}>
                            <TouchableOpacity
                                style={DashboardStyles.primaryButton}
                                onPress={() => navigation.navigate('TransactionEntry')}
                            >
                                <Text style={DashboardStyles.primaryButtonText}>Add Transaction</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={DashboardStyles.secondaryButton}
                                onPress={() => navigation.navigate('TransactionsTab')}
                            >
                                <Text style={DashboardStyles.secondaryButtonText}>View Ledger</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={DashboardStyles.sectionTitle}>Team Snapshot</Text>
                        <View style={DashboardStyles.teamCard}>
                            <View>
                                <Text style={DashboardStyles.teamMetric}>{tenantMetrics.total_users}</Text>
                                <Text style={DashboardStyles.teamLabel}>Users</Text>
                            </View>
                            <View>
                                <Text style={DashboardStyles.teamMetric}>{tenantMetrics.founders}</Text>
                                <Text style={DashboardStyles.teamLabel}>Founders</Text>
                            </View>
                            <View>
                                <Text style={DashboardStyles.teamMetric}>{tenantMetrics.incharges}</Text>
                                <Text style={DashboardStyles.teamLabel}>Incharges</Text>
                            </View>
                        </View>

                        <Text style={DashboardStyles.sectionTitle}>Recent Activity</Text>
                        {tenantMetrics.recent_activity.length ? (
                            tenantMetrics.recent_activity.map(item => (
                                <DashboardActivityRow key={item.id} item={item} />
                            ))
                        ) : (
                            <View style={DashboardStyles.emptyCard}>
                                <FeedbackState
                                    title="No recent activity yet"
                                    description="Transactions created here will appear in this feed."
                                />
                            </View>
                        )}
                    </>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
};

export default DashboardScreen;
