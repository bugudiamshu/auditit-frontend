import React from 'react';
import {Text, View} from 'react-native';
import {SocietySnapshot} from '../../../store/dashboardApi';
import {formatCurrency, formatRelativeTime} from '../../../utils/formatters';
import {DashboardStyles} from '../DashboardStyles';

type DashboardSocietyRowProps = {
    item: SocietySnapshot;
};

const DashboardSocietyRow = ({item}: DashboardSocietyRowProps) => (
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
                <Text style={DashboardStyles.societyStatLabel}>Income ({item.pending_income_count})</Text>
                <Text style={DashboardStyles.societyStatValue}>{formatCurrency(item.pending_income)}</Text>
            </View>
            <View>
                <Text style={DashboardStyles.societyStatLabel}>Expense ({item.pending_expense_count})</Text>
                <Text style={DashboardStyles.societyStatValue}>{formatCurrency(item.pending_expense)}</Text>
            </View>
        </View>

        <Text style={DashboardStyles.societyFootnote}>
            Last activity: {formatRelativeTime(item.last_transaction_at)}
        </Text>
    </View>
);

export default DashboardSocietyRow;
