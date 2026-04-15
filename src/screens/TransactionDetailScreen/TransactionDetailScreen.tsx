import React from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TransactionDetailScreenStyles as styles} from './TransactionDetailScreenStyles';
import {formatDisplayDate} from '../../utils/formatters';
import {useTransactionList} from '../../hooks/useTransactionList';
import {theme} from '../../config/theme';

const TransactionDetailScreen = ({route, navigation}: any) => {
    const {transaction} = route.params;
    const {handleDelete, isUpdating, isAdmin, user} = useTransactionList();

    const isPending = transaction.status === 'pending';
    const canEdit = isPending && (isAdmin || transaction.creator?.id === user?.id);
    const canDelete = isPending && (isAdmin || transaction.creator?.id === user?.id);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'approved':
                return {bg: theme.colors.green50, text: theme.colors.green800, label: 'Approved'};
            case 'rejected':
                return {bg: theme.colors.rose50, text: theme.colors.rose800, label: 'Rejected'};
            default:
                return {bg: theme.colors.amber50, text: theme.colors.amber800, label: 'Pending'};
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to permanently delete this transaction?',
            [
                {text: 'Cancel', style: 'cancel'},
                {
                    text: 'Delete', 
                    style: 'destructive', 
                    onPress: async () => {
                        await handleDelete(transaction.id);
                        navigation.goBack();
                    }
                },
            ],
        );
    };

    const handleEdit = () => {
        navigation.navigate('TransactionEntry', {
            editItem: transaction,
        });
    };

    const statusStyle = getStatusStyle(transaction.status);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{fontSize: 20}}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Transaction Details</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountLabel}>Total Amount</Text>
                    <Text style={[
                        styles.amountValue,
                        {color: transaction.type === 'income' ? theme.colors.success : theme.colors.danger}
                    ]}>
                        {transaction.type === 'income' ? '+' : '-'} ₹{parseFloat(transaction.amount).toLocaleString('en-IN')}
                    </Text>
                    <View style={[styles.statusBadge, {backgroundColor: statusStyle.bg}]}>
                        <Text style={[styles.statusText, {color: statusStyle.text}]}>
                            {statusStyle.label}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailsCard}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Recipient / Person</Text>
                        <Text style={styles.detailValue}>{transaction.person_name}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Type</Text>
                        <Text style={[styles.detailValue, {textTransform: 'capitalize'}]}>
                            {transaction.type}
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Payment Mode</Text>
                        <Text style={[styles.detailValue, {textTransform: 'capitalize'}]}>
                            {transaction.payment_mode}
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Date</Text>
                        <Text style={styles.detailValue}>
                            {formatDisplayDate(new Date(transaction.created_at))}
                        </Text>
                    </View>
                    <View style={[styles.detailRow, {borderBottomWidth: 0}]}>
                        <Text style={styles.detailLabel}>Created By</Text>
                        <Text style={styles.detailValue}>{transaction.creator?.name || 'System'}</Text>
                    </View>
                </View>

                <View style={styles.remarksSection}>
                    <Text style={styles.remarksTitle}>Remarks / Notes</Text>
                    {transaction.remarks ? (
                        <Text style={styles.remarksText}>{transaction.remarks}</Text>
                    ) : (
                        <Text style={styles.noRemarksText}>No remarks provided for this transaction.</Text>
                    )}
                </View>

                {(canEdit || canDelete) && (
                    <View style={styles.actionsContainer}>
                        {canEdit && (
                            <TouchableOpacity 
                                style={styles.editButton}
                                onPress={handleEdit}
                                disabled={isUpdating}
                            >
                                <Text style={{fontSize: 14}}>✏️</Text>
                                <Text style={styles.editButtonText}>Edit Transaction</Text>
                            </TouchableOpacity>
                        )}
                        {canDelete && (
                            <TouchableOpacity 
                                style={styles.deleteButton}
                                onPress={confirmDelete}
                                disabled={isUpdating}
                            >
                                <Text style={{fontSize: 14}}>🗑️</Text>
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}

                <View style={{height: 40}} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default TransactionDetailScreen;
