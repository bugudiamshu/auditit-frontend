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
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
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
    onApprove,
    onReject,
    onEdit,
    onDelete,
}: TransactionCardProps) => {
    const isPending = item.status === 'pending';
    const canApproveReject = isFounder && isPending;
    const canEdit = isPending && (isFounder || item.creator?.id === currentUserId);
    const canDelete = isPending && (isFounder || item.creator?.id === currentUserId);

    return (
        <View style={TransactionListScreenStyles.card}>
            <View style={TransactionListScreenStyles.topRow}>
                <View style={TransactionListScreenStyles.titleBlock}>
                    <Text style={TransactionListScreenStyles.name}>{item.person_name}</Text>
                    <Text style={TransactionListScreenStyles.metaText}>
                        {item.payment_mode === 'online' ? 'Online Transfer' : 'Cash Payment'}
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
                <View style={{flex: 1, marginRight: 10}}>
                    <Text style={TransactionListScreenStyles.date}>{item.transaction_date}</Text>
                    {item.remarks ? (
                        <Text style={TransactionListScreenStyles.remarks} numberOfLines={2}>
                            {item.remarks}
                        </Text>
                    ) : null}
                    <Text style={TransactionListScreenStyles.metaText}>
                        By {item.creator?.name || 'System'}
                        {item.approver?.name ? ` • Approved by ${item.approver.name}` : ''}
                    </Text>
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

            {(canApproveReject || canEdit || canDelete) ? (
                <View style={TransactionListScreenStyles.actionRow}>
                    {canEdit && (
                        <TouchableOpacity
                            style={[TransactionListScreenStyles.actionButton, TransactionListScreenStyles.editButton]}
                            onPress={() => onEdit(item)}
                            disabled={isUpdating}
                        >
                            <Text style={TransactionListScreenStyles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    )}
                    {canDelete && (
                        <TouchableOpacity
                            style={[TransactionListScreenStyles.actionButton, TransactionListScreenStyles.deleteButton]}
                            onPress={() => onDelete(item.id)}
                            disabled={isUpdating}
                        >
                            <Text style={TransactionListScreenStyles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    )}
                    <View style={{flex: 1}} />
                    {canApproveReject && (
                        <>
                            <TouchableOpacity
                                style={[TransactionListScreenStyles.actionButton, TransactionListScreenStyles.rejectButton]}
                                onPress={() => onReject(item.id)}
                                disabled={isUpdating}
                            >
                                <Text style={TransactionListScreenStyles.rejectButtonText}>Reject</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[TransactionListScreenStyles.actionButton, TransactionListScreenStyles.approveButton]}
                                onPress={() => onApprove(item.id)}
                                disabled={isUpdating}
                            >
                                <Text style={TransactionListScreenStyles.approveButtonText}>Approve</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            ) : null}
        </View>
    );
};

export default TransactionCard;
