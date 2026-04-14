import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../../../config/theme';
import {TransactionRecord} from '../../../store/transactionApi';
import {TransactionListScreenStyles} from '../TransactionListScreenStyles';

type TransactionCardProps = {
    item: TransactionRecord;
    isFounder: boolean;
    currentUserId?: number;
    isUpdating: boolean;
    onEdit: (item: TransactionRecord) => void;
    onDelete: (id: number) => void;
    onPress: (item: TransactionRecord) => void;
};

const statusColor = (status: string) => {
    switch (status) {
        case 'approved':
            return '#10B981'; // Green-500
        case 'rejected':
            return '#EF4444'; // Red-500
        default:
            return '#F59E0B'; // Amber-500
    }
};

const TransactionCard = ({
    item,
    isFounder,
    currentUserId,
    isUpdating,
    onEdit,
    onDelete,
    onPress,
}: TransactionCardProps) => {
    const isPending = item.status === 'pending';
    const canEdit = isPending && (isFounder || item.creator?.id === currentUserId);
    const canDelete = isPending && (isFounder || item.creator?.id === currentUserId);

    return (
        <TouchableOpacity 
            style={TransactionListScreenStyles.compactCard}
            onPress={() => onPress(item)}
            activeOpacity={0.7}
        >
            <View style={TransactionListScreenStyles.compactMain}>
                <View style={TransactionListScreenStyles.compactInfo}>
                    <Text style={TransactionListScreenStyles.compactName} numberOfLines={1}>
                        {item.person_name}
                    </Text>
                    <Text style={TransactionListScreenStyles.compactMeta}>
                        {item.payment_mode === 'online' ? '💳 Online' : '💵 Cash'} • By {item.creator?.name?.split(' ')[0] || 'System'}
                    </Text>
                </View>
                <View style={TransactionListScreenStyles.compactValue}>
                    <Text
                        style={[
                            TransactionListScreenStyles.compactAmount,
                            {color: item.type === 'income' ? '#10B981' : '#EF4444'},
                        ]}
                    >
                        {item.type === 'income' ? '+' : '-'} ₹{parseFloat(item.amount).toLocaleString('en-IN')}
                    </Text>
                    <View
                        style={[
                            TransactionListScreenStyles.compactStatusDot,
                            {backgroundColor: statusColor(item.status)},
                        ]}
                    />
                </View>
            </View>

            {(canEdit || canDelete) && (
                <View style={TransactionListScreenStyles.compactBottom}>
                    <View style={{flex: 1}} />
                    <View style={TransactionListScreenStyles.compactActions}>
                        {canEdit && (
                            <TouchableOpacity
                                style={TransactionListScreenStyles.compactActionButton}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    onEdit(item);
                                }}
                                disabled={isUpdating}
                            >
                                <Text style={TransactionListScreenStyles.compactActionIcon}>✏️</Text>
                            </TouchableOpacity>
                        )}
                        {canDelete && (
                            <TouchableOpacity
                                style={TransactionListScreenStyles.compactActionButton}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    onDelete(item.id);
                                }}
                                disabled={isUpdating}
                            >
                                <Text style={TransactionListScreenStyles.compactActionIcon}>🗑️</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default TransactionCard;
