import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TransactionDetailScreenStyles as styles} from './TransactionDetailScreenStyles';
import {formatDisplayDate} from '../../utils/formatters';

const TransactionDetailScreen = ({route, navigation}: any) => {
    const {transaction} = route.params;

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'approved':
                return {bg: '#DCFCE7', text: '#166534', label: 'Approved'};
            case 'rejected':
                return {bg: '#FEE2E2', text: '#991B1B', label: 'Rejected'};
            default:
                return {bg: '#FEF3C7', text: '#92400E', label: 'Pending'};
        }
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
                        {color: transaction.type === 'income' ? '#10B981' : '#EF4444'}
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

                <View style={{height: 40}} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default TransactionDetailScreen;
