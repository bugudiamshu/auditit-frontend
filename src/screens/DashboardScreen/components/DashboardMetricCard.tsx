import React from 'react';
import {Text, View} from 'react-native';
import {DashboardStyles} from '../DashboardStyles';

type DashboardMetricCardProps = {
    label: string;
    value: string;
    tone?: 'default' | 'success' | 'danger' | 'warning' | 'info';
    caption?: string;
    isWide?: boolean;
    trendIcon?: string;
};

const DashboardMetricCard = ({
    label,
    value,
    tone = 'default',
    caption,
    isWide = false,
    trendIcon,
}: DashboardMetricCardProps) => {
    const toneStyle =
        tone === 'success'
            ? DashboardStyles.metricCardSuccess
            : tone === 'danger'
              ? DashboardStyles.metricCardDanger
              : tone === 'warning'
                ? DashboardStyles.metricCardWarning
                : tone === 'info'
                  ? DashboardStyles.metricCardInfo
                  : DashboardStyles.metricCardDefault;

    return (
        <View style={[
            DashboardStyles.metricCard, 
            toneStyle,
            isWide && DashboardStyles.metricCardWide
        ]}>
            <View style={DashboardStyles.metricValueContainer}>
                <Text style={DashboardStyles.metricLabel}>{label}</Text>
                <Text style={[
                    DashboardStyles.metricValue,
                    !isWide && DashboardStyles.metricValueSmall
                ]}>
                    {value}
                </Text>
                {caption ? <Text style={DashboardStyles.metricCaption}>{caption}</Text> : null}
            </View>
            
            {isWide && trendIcon && (
                <View style={DashboardStyles.metricTrend}>
                    <Text style={DashboardStyles.metricTrendText}>{trendIcon}</Text>
                </View>
            )}
        </View>
    );
};

export default DashboardMetricCard;
