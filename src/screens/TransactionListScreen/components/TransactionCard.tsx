import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../../../config/theme';
import {TransactionRecord} from '../../../store/transactionApi';
import {TransactionListScreenStyles} from '../TransactionListScreenStyles';

type TransactionCardProps = {
    item: TransactionRecord;
    isFounder: boolean;
    isUpdating: boolean;
    onDecision: (id: number, status: 'approved' | 'rejected') => void;
};

const statusColor = (status: string) => {
    switch (status) {
        case 'approved':
            return theme.colors.success;
        case 'rejected':
            return theme.colors.danger;
        default:
            return theme.colors.warning;
    }
};

const TransactionCard = ({
    item,
    isFounder,
    isUpdating,
    onDecision,
}: TransactionCardProps) => (
    <View style={TransactionListScreenStyles.card}>
        <View style={TransactionListScreenStyles.topRow}>
            <View style={TransactionListScreenStyles.titleBlock}>
                <Text style={TransactionListScreenStyles.name}>{item.person_name}</Text>
                <Text style={TransactionListScreenStyles.metaText}>
                    {item.creator?.name ? `Created by ${item.creator.name}` : item.payment_mode}
                </Text>
            </View>
            <View
                style={[
                    TransactionListScreenStyles.badge,
                    {backgroundColor: statusColor(item.status)},
                ]}
            >
                <Text style={TransactionListScreenStyles.badgeText}>{item.status.toUpperCase()}</Text>
            </View>
        </View>

        <View style={TransactionListScreenStyles.bottomRow}>
            <View>
                <Text style={TransactionListScreenStyles.date}>{item.transaction_date}</Text>
                {item.remarks ? (
                    <Text style={TransactionListScreenStyles.remarks} numberOfLines={1}>
                        {item.remarks}
                    </Text>
                ) : null}
                {item.approver?.name ? (
                    <Text style={TransactionListScreenStyles.metaText}>
                        Approved by {item.approver.name}
                    </Text>
                ) : null}
            </View>

            <Text
                style={[
                    TransactionListScreenStyles.amount,
                    {color: item.type === 'income' ? theme.colors.success : theme.colors.danger},
                ]}
            >
                {item.type === 'income' ? '+' : '-'} ₹{parseFloat(item.amount).toLocaleString()}
            </Text>
        </View>

        {isFounder && item.status === 'pending' ? (
            <View style={TransactionListScreenStyles.actionRow}>
                <TouchableOpacity
                    style={[
                        TransactionListScreenStyles.actionButton,
                        TransactionListScreenStyles.rejectButton,
                    ]}
                    onPress={() => onDecision(item.id, 'rejected')}
                    disabled={isUpdating}
                >
                    <Text style={TransactionListScreenStyles.rejectButtonText}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        TransactionListScreenStyles.actionButton,
                        TransactionListScreenStyles.approveButton,
                    ]}
                    onPress={() => onDecision(item.id, 'approved')}
                    disabled={isUpdating}
                >
                    <Text style={TransactionListScreenStyles.approveButtonText}>Approve</Text>
                </TouchableOpacity>
            </View>
        ) : null}
    </View>
);

export default TransactionCard;
