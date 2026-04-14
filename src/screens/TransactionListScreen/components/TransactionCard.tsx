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
    currentUserId,
    isUpdating,
    onEdit,
    onDelete,
}: TransactionCardProps) => {
    const isPending = item.status === 'pending';
    const canEdit = isPending && (isFounder || item.creator?.id === currentUserId);
    const canDelete = isPending && (isFounder || item.creator?.id === currentUserId);

    return (
        <View style={TransactionListScreenStyles.compactCard}>
            <View style={TransactionListScreenStyles.compactMain}>
                <View style={TransactionListScreenStyles.compactInfo}>
                    <Text style={TransactionListScreenStyles.compactName} numberOfLines={1}>
                        {item.person_name}
                    </Text>
                </View>
                <View style={TransactionListScreenStyles.compactValue}>
                    <Text
                        style={[
                            TransactionListScreenStyles.compactAmount,
                            {color: item.type === 'income' ? theme.colors.success : theme.colors.danger},
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

            {item.remarks ? (
                <Text style={TransactionListScreenStyles.compactRemarks} numberOfLines={1}>
                    "{item.remarks}"
                </Text>
            ) : null}

            <View style={TransactionListScreenStyles.compactBottom}>
                <Text style={TransactionListScreenStyles.compactMeta}>
                    {item.payment_mode === 'online' ? 'Online' : 'Cash'} • By {item.creator?.name?.split(' ')[0] || 'System'}
                </Text>

                {(canEdit || canDelete) && (
                    <View style={TransactionListScreenStyles.compactActions}>
                        {canEdit && (
                            <TouchableOpacity
                                style={TransactionListScreenStyles.compactActionButton}
                                onPress={() => onEdit(item)}
                                disabled={isUpdating}
                            >
                                <Text style={TransactionListScreenStyles.compactActionIcon}>✏️</Text>
                            </TouchableOpacity>
                        )}
                        {canDelete && (
                            <TouchableOpacity
                                style={TransactionListScreenStyles.compactActionButton}
                                onPress={() => onDelete(item.id)}
                                disabled={isUpdating}
                            >
                                <Text style={TransactionListScreenStyles.compactActionIcon}>🗑️</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default TransactionCard;
