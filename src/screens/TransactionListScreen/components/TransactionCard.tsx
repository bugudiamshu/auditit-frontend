import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../../../config/theme';
import {TransactionRecord} from '../../../store/transactionApi';
import {TransactionListScreenStyles} from '../TransactionListScreenStyles';

type TransactionCardProps = {
    item: TransactionRecord;
    isAdmin: boolean;
    currentUserId?: number;
    isUpdating: boolean;
    onPress: (item: TransactionRecord) => void;
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

const statusLabel = (status: string) => {
    switch (status) {
        case 'approved': return 'Approved';
        case 'rejected': return 'Rejected';
        default: return 'Pending';
    }
};

const TransactionCard = ({
    item,
    isAdmin,
    currentUserId,
    isUpdating,
    onPress,
}: TransactionCardProps) => {
    const isIncome = item.type === 'income';

    return (
        <TouchableOpacity 
            style={TransactionListScreenStyles.compactCard}
            onPress={() => onPress(item)}
            activeOpacity={0.7}
        >
            <View style={TransactionListScreenStyles.compactMain}>
                <View style={[
                    TransactionListScreenStyles.compactIconContainer, 
                    { backgroundColor: isIncome ? theme.colors.green50 : theme.colors.rose50 }
                ]}>
                    <Text style={TransactionListScreenStyles.compactIcon}>
                        {isIncome ? '📥' : '📤'}
                    </Text>
                </View>

                <View style={TransactionListScreenStyles.compactInfo}>
                    <Text style={TransactionListScreenStyles.compactName} numberOfLines={1}>
                        {isIncome ? (item.reference_no || 'No Receipt') : item.person_name}
                    </Text>
                    <Text style={TransactionListScreenStyles.compactMeta}>
                        {item.payment_mode === 'online' ? '🏦 Online' : '💵 Cash'} • {item.creator?.name?.split(' ')[0] || 'User'}
                    </Text>
                </View>

                <View style={TransactionListScreenStyles.compactValue}>
                    <Text
                        style={[
                            TransactionListScreenStyles.compactAmount,
                            {color: isIncome ? theme.colors.success : theme.colors.danger},
                        ]}
                    >
                        {isIncome ? '+' : '-'} ₹{parseFloat(item.amount).toLocaleString('en-IN')}
                    </Text>
                    <View style={TransactionListScreenStyles.statusBadge}>
                        <View
                            style={[
                                TransactionListScreenStyles.compactStatusDot,
                                {backgroundColor: statusColor(item.status)},
                            ]}
                        />
                        <Text style={[
                            TransactionListScreenStyles.statusText,
                            { color: statusColor(item.status) }
                        ]}>
                            {statusLabel(item.status)}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default TransactionCard;
