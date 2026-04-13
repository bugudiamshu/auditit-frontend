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
            {/* Header: Name & Icons */}
            <View style={TransactionListScreenStyles.topRow}>
                <View style={TransactionListScreenStyles.titleBlock}>
                    <Text style={TransactionListScreenStyles.name}>{item.person_name}</Text>
                    <View
                        style={[
                            TransactionListScreenStyles.badge,
                            {backgroundColor: statusColor(item.status), alignSelf: 'flex-start', marginTop: 6},
                        ]}
                    >
                        <Text style={TransactionListScreenStyles.badgeText}>{item.status.toUpperCase()}</Text>
                    </View>
                </View>

                {/* Edit/Delete Icons positioned top right */}
                {(canEdit || canDelete) && (
                    <View style={TransactionListScreenStyles.secondaryActions}>
                        {canEdit && (
                            <TouchableOpacity
                                style={[TransactionListScreenStyles.iconButton, TransactionListScreenStyles.editIconButton]}
                                onPress={() => onEdit(item)}
                                disabled={isUpdating}
                            >
                                <Text style={TransactionListScreenStyles.iconLabel}>✏️</Text>
                            </TouchableOpacity>
                        )}
                        {canDelete && (
                            <TouchableOpacity
                                style={[TransactionListScreenStyles.iconButton, TransactionListScreenStyles.deleteIconButton]}
                                onPress={() => onDelete(item.id)}
                                disabled={isUpdating}
                            >
                                <Text style={TransactionListScreenStyles.iconLabel}>🗑️</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>

            {/* Amount & Mode */}
            <View style={TransactionListScreenStyles.amountRow}>
                <Text
                    style={[
                        TransactionListScreenStyles.amount,
                        {color: item.type === 'income' ? theme.colors.success : theme.colors.danger},
                    ]}
                >
                    {item.type === 'income' ? '+' : '-'} ₹{parseFloat(item.amount).toLocaleString('en-IN')}
                </Text>
                <Text style={TransactionListScreenStyles.paymentMode}>
                    {item.payment_mode === 'online' ? 'Online' : 'Cash'}
                </Text>
            </View>

            {/* Remarks */}
            {item.remarks ? (
                <View style={TransactionListScreenStyles.remarksBox}>
                    <Text style={TransactionListScreenStyles.remarks} numberOfLines={2}>
                        "{item.remarks}"
                    </Text>
                </View>
            ) : null}

            {/* Metadata */}
            <View style={TransactionListScreenStyles.metaRow}>
                <Text style={TransactionListScreenStyles.date}>{item.transaction_date}</Text>
                <Text style={TransactionListScreenStyles.metaText}>
                    By {item.creator?.name?.split(' ')[0] || 'System'}
                </Text>
            </View>

            {/* Primary Actions (Founder Only) */}
            {canApproveReject && (
                <>
                    <View style={TransactionListScreenStyles.actionDivider} />
                    <View style={TransactionListScreenStyles.primaryActions}>
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
                    </View>
                </>
            )}
        </View>
    );
};

export default TransactionCard;
