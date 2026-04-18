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
    const {data, isLoading, isFetching, error, refetch, user, isAdmin, isCentralView, tenantMetrics, centralSummary} =
        useDashboardData();

    if (isLoading) {
        return (
            <SafeAreaView style={DashboardStyles.container}>
                <AppHeader />
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
                <AppHeader />
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

    const handleActivityPress = (activity: any) => {
        const transaction = {
            ...activity,
            person_name: activity.title,
            amount: activity.amount.toString(),
            transaction_date: activity.transaction_date,
            document_url: activity.document_url,
            document_type: activity.document_type,
            creator: activity.created_by ? { name: activity.created_by } : null,
        };
        
        navigation.navigate('TransactionDetail', { 
            transaction,
            orgCode: activity.org_code || data.organization?.org_code 
        });
    };

    const handleSocietyPress = (society: any) => {
        navigation.navigate('OrganizationDetail', {
            id: society.id,
            name: society.name,
        });
    };

    return (
        <SafeAreaView style={DashboardStyles.container}>
            <AppHeader />

            <ScrollView
                contentContainerStyle={DashboardStyles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={refetch}
                        tintColor={theme.colors.primary}
                    />
                }
            >
                {!isCentralView && (
                    <View style={DashboardStyles.heroCard}>
                        <Text style={DashboardStyles.heroAccent}>🏛️</Text>
                        <View style={DashboardStyles.heroBadge}>
                            <Text style={DashboardStyles.heroEyebrow}>
                                {data.organization?.org_code ?? 'Live ledger'}
                            </Text>
                        </View>
                        <Text style={DashboardStyles.heroTitle}>
                            {`Welcome back,\n${user?.name?.split(' ')[0] ?? 'Partner'}.`}
                        </Text>
                        <Text style={DashboardStyles.heroSubtitle}>
                            {`${tenantMetrics?.pending_transactions ?? 0} transactions are waiting for action today.`}
                        </Text>
                    </View>
                )}

                {isCentralView && centralSummary ? (
                    <>
                        <View style={DashboardStyles.sectionHeader}>
                            <Text style={DashboardStyles.sectionTitle}>Portfolio Insights</Text>
                        </View>
                        <View style={DashboardStyles.metricGrid}>
                            <DashboardMetricCard
                                label="Portfolio Net"
                                value={formatCurrency(centralSummary.net_total)}
                                tone="info"
                                isWide={true}
                                trendIcon="🏦"
                                caption={`${formatCompact(centralSummary.total_transactions)} total transactions`}
                            />
                            <DashboardMetricCard
                                label="Pending Total"
                                value={formatCurrency(centralSummary.pending_amount)}
                                tone="warning"
                                isWide={true}
                                trendIcon="⏳"
                                caption={`${centralSummary.pending_approvals} approvals`}
                            />
                            <DashboardMetricCard
                                label="Pending Income"
                                value={formatCurrency(centralSummary.pending_income)}
                                tone="success"
                                caption="To be approved"
                            />
                            <DashboardMetricCard
                                label="Pending Expense"
                                value={formatCurrency(centralSummary.pending_expense)}
                                tone="danger"
                                caption="To be approved"
                            />
                        </View>

                        <View style={DashboardStyles.sectionHeader}>
                            <Text style={DashboardStyles.sectionTitle}>Organizations</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('PortfolioSelection')}>
                                <Text style={DashboardStyles.sectionAction}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        {centralSummary.societies.length ? (
                            centralSummary.societies.map(item => (
                                <DashboardSocietyRow 
                                    key={item.id} 
                                    item={item} 
                                    onPress={() => handleSocietyPress(item)}
                                />
                            ))
                        ) : (
                            <View style={DashboardStyles.emptyCard}>
                                <FeedbackState
                                    title="No organizations found"
                                    description="Add an active tenant to start seeing admin-level insights here."
                                />
                            </View>
                        )}
                    </>
                ) : null}

                {!isCentralView && tenantMetrics ? (
                    <>
                        <View style={DashboardStyles.sectionHeader}>
                            <Text style={DashboardStyles.sectionTitle}>Overview</Text>
                        </View>
                        <View style={DashboardStyles.metricGrid}>
                            {isAdmin ? (
                                <>
                                    <DashboardMetricCard
                                        label="Net Balance"
                                        value={formatCurrency(tenantMetrics.net_total)}
                                        tone="info"
                                        isWide={true}
                                        trendIcon={tenantMetrics.net_total >= 0 ? '📈' : '📉'}
                                        caption={`${tenantMetrics.total_transactions} transactions tracked`}
                                    />
                                    <DashboardMetricCard
                                        label="Pending Total"
                                        value={formatCurrency(tenantMetrics.pending_amount)}
                                        tone="warning"
                                        isWide={true}
                                        trendIcon="⏳"
                                        caption={`${tenantMetrics.pending_transactions} transactions waiting`}
                                    />
                                    <DashboardMetricCard
                                        label="Pending Income"
                                        value={formatCurrency(tenantMetrics.pending_income)}
                                        tone="success"
                                        caption="To be approved"
                                    />
                                    <DashboardMetricCard
                                        label="Pending Expense"
                                        value={formatCurrency(tenantMetrics.pending_expense)}
                                        tone="danger"
                                        caption="To be approved"
                                    />
                                </>
                            ) : (
                                <>
                                    <DashboardMetricCard
                                        label="Pending Total"
                                        value={formatCurrency(tenantMetrics.pending_amount)}
                                        tone="warning"
                                        isWide={true}
                                        trendIcon="⏳"
                                        caption={`${tenantMetrics.pending_transactions} transactions waiting`}
                                    />
                                    <DashboardMetricCard
                                        label="Pending Income"
                                        value={formatCurrency(tenantMetrics.pending_income)}
                                        tone="success"
                                        caption="To be approved"
                                    />
                                    <DashboardMetricCard
                                        label="Pending Expense"
                                        value={formatCurrency(tenantMetrics.pending_expense)}
                                        tone="danger"
                                        caption="To be approved"
                                    />
                                </>
                            )}
                        </View>

                        <View style={DashboardStyles.sectionHeader}>
                            <Text style={DashboardStyles.sectionTitle}>Quick Actions</Text>
                        </View>
                        
                        <View style={DashboardStyles.actionGrid}>
                            <TouchableOpacity
                                style={DashboardStyles.actionItem}
                                onPress={() => navigation.navigate('TransactionEntry')}
                            >
                                <View style={[DashboardStyles.actionIconContainer, DashboardStyles.primaryActionContainer]}>
                                    <Text style={DashboardStyles.actionIcon}>➕</Text>
                                </View>
                                <Text style={DashboardStyles.actionLabel}>Add Entry</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={DashboardStyles.actionItem}
                                onPress={() => navigation.navigate('TransactionsTab')}
                            >
                                <View style={DashboardStyles.actionIconContainer}>
                                    <Text style={DashboardStyles.actionIcon}>📋</Text>
                                </View>
                                <Text style={DashboardStyles.actionLabel}>View Ledger</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={DashboardStyles.actionItem}
                                onPress={() => {}} 
                            >
                                <View style={DashboardStyles.actionIconContainer}>
                                    <Text style={DashboardStyles.actionIcon}>📊</Text>
                                </View>
                                <Text style={DashboardStyles.actionLabel}>Reports</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={DashboardStyles.sectionHeader}>
                            <Text style={DashboardStyles.sectionTitle}>Team Snapshot</Text>
                        </View>
                        
                        <View style={DashboardStyles.teamCard}>
                            <View>
                                <Text style={DashboardStyles.teamMetric}>{tenantMetrics.total_users}</Text>
                                <Text style={DashboardStyles.teamLabel}>Users</Text>
                            </View>
                            <View>
                                <Text style={DashboardStyles.teamMetric}>{tenantMetrics.admins}</Text>
                                <Text style={DashboardStyles.teamLabel}>Admins</Text>
                            </View>
                            <View>
                                <Text style={DashboardStyles.teamMetric}>{tenantMetrics.incharges}</Text>
                                <Text style={DashboardStyles.teamLabel}>Incharges</Text>
                            </View>
                        </View>

                        <Text style={DashboardStyles.sectionTitle}>Recent Activity</Text>
                        {tenantMetrics.recent_activity.length ? (
                            tenantMetrics.recent_activity.map(item => (
                                <DashboardActivityRow 
                                    key={item.id} 
                                    item={item} 
                                    onPress={handleActivityPress}
                                />
                            ))
                        ) : (
                            <View style={DashboardStyles.emptyCard}>
                                <FeedbackState
                                    title="No recent activity yet"
                                    description="Approve or create transactions to see them listed here."
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
