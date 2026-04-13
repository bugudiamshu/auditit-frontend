import React from 'react';
import {Text, View} from 'react-native';
import {DashboardStyles} from '../DashboardStyles';

type DashboardMetricCardProps = {
    label: string;
    value: string;
    tone?: 'default' | 'success' | 'danger' | 'warning';
    caption?: string;
};

const DashboardMetricCard = ({
    label,
    value,
    tone = 'default',
    caption,
}: DashboardMetricCardProps) => {
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

export default DashboardMetricCard;
