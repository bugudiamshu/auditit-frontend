import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {DashboardActivity} from '../../../store/dashboardApi';
import {formatCurrency, formatRelativeTime} from '../../../utils/formatters';
import {DashboardStyles} from '../DashboardStyles';

type DashboardActivityRowProps = {
    item: DashboardActivity;
    onPress: (item: DashboardActivity) => void;
};

const DashboardActivityRow = ({item, onPress}: DashboardActivityRowProps) => (
    <TouchableOpacity 
        style={DashboardStyles.activityItem}
        onPress={() => onPress(item)}
        activeOpacity={0.7}
    >
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
            <Text style={DashboardStyles.activityTitle}>
                {item.type === 'income' ? (item.reference_no || 'No Receipt') : item.person_name}
            </Text>
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
    </TouchableOpacity>
);

export default DashboardActivityRow;
