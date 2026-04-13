import React from 'react';
import {Text, View} from 'react-native';
import {DashboardActivity} from '../../../store/dashboardApi';
import {formatCurrency, formatRelativeTime} from '../../../utils/formatters';
import {DashboardStyles} from '../DashboardStyles';

type DashboardActivityRowProps = {
    item: DashboardActivity;
};

const DashboardActivityRow = ({item}: DashboardActivityRowProps) => (
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

export default DashboardActivityRow;
