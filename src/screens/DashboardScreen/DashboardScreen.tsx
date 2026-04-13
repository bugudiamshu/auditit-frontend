import React from 'react';
import {
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import {theme} from '../../config/theme';
import {DashboardStyles} from './DashboardStyles';
import {
    DashboardActivity,
    SocietySnapshot,
    useGetDashboardSummaryQuery,
} from '../../store/dashboardApi';
import {useAppSelector} from '../../store/store';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

const compactFormatter = new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1,
});

const formatCurrency = (value: number) => currencyFormatter.format(value ?? 0);
const formatCompact = (value: number) => compactFormatter.format(value ?? 0);

const formatRelativeTime = (value: string | null) => {
    if (!value) {
        return 'No recent activity';
    }

    const current = new Date().getTime();
    const target = new Date(value).getTime();
    const diffMinutes = Math.max(1, Math.round((current - target) / 60000));

    if (diffMinutes < 60) {
        return `${diffMinutes}m ago`;
    }

    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) {
        return `${diffHours}h ago`;
    }

    const diffDays = Math.round(diffHours / 24);
    return `${diffDays}d ago`;
};

const MetricCard = ({
    label,
    value,
    tone = 'default',
    caption,
}: {
    label: string;
    value: string;
    tone?: 'default' | 'success' | 'danger' | 'warning';
    caption?: string;
}) => {
    const toneStyle =
        tone === 'success'
            ? DashboardStyles.metricCardSuccess
            : tone === 'danger'
              ? DashboardStyles.metricCardDanger
              : tone === 'warning'
                ? DashboardStyles.metricCardWarning
                : DashboardStyles.metricCardDefault;

    return (
        <View style={[DashboardStyles.metricCard, toneStyle]}>
            <Text style={DashboardStyles.metricLabel}>{label}</Text>
            <Text style={DashboardStyles.metricValue}>{value}</Text>
            {caption ? <Text style={DashboardStyles.metricCaption}>{caption}</Text> : null}
        </View>
    );
};

const ActivityRow = ({item}: {item: DashboardActivity}) => (
    <View style={DashboardStyles.activityItem}>
        <View
            style={[
                DashboardStyles.activityIcon,
                item.type === 'income'
                    ? DashboardStyles.activityIconSuccess
                    : DashboardStyles.activityIconDanger,
            ]}
        >
            <Text style={DashboardStyles.activityIconText}>
                {item.type === 'income' ? 'IN' : 'OUT'}
            </Text>
        </View>
        <View style={DashboardStyles.activityContent}>
            <Text style={DashboardStyles.activityTitle}>{item.title}</Text>
            <Text style={DashboardStyles.activitySubtitle}>
                {item.created_by ? `By ${item.created_by}` : 'Created'} • {item.status}
            </Text>
            <Text style={DashboardStyles.activityTime}>
                {formatRelativeTime(item.created_at)}
            </Text>
        </View>
        <Text
            style={[
                DashboardStyles.activityAmount,
                item.type === 'income' ? DashboardStyles.textSuccess : DashboardStyles.textDanger,
            ]}
        >
            {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
        </Text>
    </View>
);

const SocietyRow = ({item}: {item: SocietySnapshot}) => (
    <View style={DashboardStyles.societyCard}>
        <View style={DashboardStyles.societyHeader}>
            <View style={[DashboardStyles.colorSwatch, {backgroundColor: item.primary_color}]} />
            <View style={DashboardStyles.societyInfo}>
                <Text style={DashboardStyles.societyTitle}>{item.name}</Text>
                <Text style={DashboardStyles.societySubtitle}>
                    {item.org_code} • {item.total_users} users
                </Text>
            </View>
        </View>

        <View style={DashboardStyles.societyStatsRow}>
            <View>
                <Text style={DashboardStyles.societyStatLabel}>Net</Text>
                <Text style={DashboardStyles.societyStatValue}>{formatCurrency(item.net_total)}</Text>
            </View>
            <View>
                <Text style={DashboardStyles.societyStatLabel}>Pending</Text>
                <Text style={DashboardStyles.societyStatValue}>{item.pending_transactions}</Text>
            </View>
            <View>
                <Text style={DashboardStyles.societyStatLabel}>Transactions</Text>
                <Text style={DashboardStyles.societyStatValue}>{item.total_transactions}</Text>
            </View>
        </View>

        <Text style={DashboardStyles.societyFootnote}>
            Last activity: {formatRelativeTime(item.last_transaction_at)}
        </Text>
    </View>
);

const DashboardScreen = ({navigation}: any) => {
    const {data, isLoading, isFetching, error, refetch} = useGetDashboardSummaryQuery();
    const {user} = useAppSelector(state => state.auth);

    if (isLoading) {
        return (
            <SafeAreaView style={DashboardStyles.container}>
                <AppHeader pageTitle="Dashboard" />
                <View style={DashboardStyles.centerState}>
                    <Text style={DashboardStyles.stateTitle}>Loading dashboard...</Text>
                    <Text style={DashboardStyles.stateText}>Pulling the latest finance and workflow data.</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error || !data?.success) {
        return (
            <SafeAreaView style={DashboardStyles.container}>
                <AppHeader pageTitle="Dashboard" />
                <View style={DashboardStyles.centerState}>
                    <Text style={DashboardStyles.stateTitle}>Dashboard unavailable</Text>
                    <Text style={DashboardStyles.stateText}>
                        We could not load the current summary right now.
                    </Text>
                    <TouchableOpacity style={DashboardStyles.primaryButton} onPress={refetch}>
                        <Text style={DashboardStyles.primaryButtonText}>Try again</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const isCentralView = data.view === 'central';
    const tenantMetrics = data.metrics;
    const centralSummary = data.summary;

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
                            <MetricCard
                                label="Portfolio Net"
                                value={formatCurrency(centralSummary.net_total)}
                                tone="success"
                                caption={`${formatCompact(centralSummary.total_transactions)} transactions`}
                            />
                            <MetricCard
                                label="Pending Amount"
                                value={formatCurrency(centralSummary.pending_amount)}
                                tone="warning"
                                caption={`${centralSummary.pending_approvals} approvals open`}
                            />
                            <MetricCard
                                label="Income"
                                value={formatCurrency(centralSummary.income_total)}
                                tone="success"
                                caption={`${centralSummary.active_users} active users`}
                            />
                            <MetricCard
                                label="Expense"
                                value={formatCurrency(centralSummary.expense_total)}
                                tone="danger"
                                caption={`${centralSummary.total_societies} societies`}
                            />
                        </View>

                        <Text style={DashboardStyles.sectionTitle}>Organizations</Text>
                        {centralSummary.societies.length ? (
                            centralSummary.societies.map(item => (
                                <SocietyRow key={item.id} item={item} />
                            ))
                        ) : (
                            <View style={DashboardStyles.emptyCard}>
                                <Text style={DashboardStyles.stateTitle}>No organizations found</Text>
                                <Text style={DashboardStyles.stateText}>
                                    Add an active tenant to start seeing founder-level insights here.
                                </Text>
                            </View>
                        )}
                    </>
                ) : null}

                {!isCentralView && tenantMetrics ? (
                    <>
                        <View style={DashboardStyles.metricGrid}>
                            <MetricCard
                                label="Net Balance"
                                value={formatCurrency(tenantMetrics.net_total)}
                                tone={tenantMetrics.net_total >= 0 ? 'success' : 'danger'}
                                caption={`${tenantMetrics.total_transactions} total transactions`}
                            />
                            <MetricCard
                                label="Pending Queue"
                                value={tenantMetrics.pending_transactions.toString()}
                                tone="warning"
                                caption={formatCurrency(tenantMetrics.pending_amount)}
                            />
                            <MetricCard
                                label="Income"
                                value={formatCurrency(tenantMetrics.income_total)}
                                tone="success"
                                caption={`${tenantMetrics.approved_transactions} approved`}
                            />
                            <MetricCard
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
                                <ActivityRow key={item.id} item={item} />
                            ))
                        ) : (
                            <View style={DashboardStyles.emptyCard}>
                                <Text style={DashboardStyles.stateTitle}>No recent activity yet</Text>
                                <Text style={DashboardStyles.stateText}>
                                    Transactions created here will appear in this feed.
                                </Text>
                            </View>
                        )}
                    </>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
};

export default DashboardScreen;
