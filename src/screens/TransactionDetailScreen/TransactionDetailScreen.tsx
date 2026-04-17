import React, {useState} from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Image,
    Pressable
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TransactionDetailScreenStyles as styles} from './TransactionDetailScreenStyles';
import {formatDisplayDate} from '../../utils/formatters';
import {useTransactionList} from '../../hooks/useTransactionList';
import {theme} from '../../config/theme';
import {BACKEND_URL} from "../../store/baseQuery.ts";

const TransactionDetailScreen = ({route, navigation}: any) => {
    const {transaction} = route.params;
    const {handleDelete, isUpdating, isAdmin, user} = useTransactionList();

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

    const handleViewDocument = () => {
        if (!transaction.document_url) return;

        let url = transaction.document_url;

        if (!url.startsWith('http')) {
            url = `${BACKEND_URL}/${url}`;
        }

        setPreviewUrl(url);
        setPreviewVisible(true);
    };

    const statusStyle = getStatusStyle(transaction.status);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={{fontSize: 20}}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Transaction Details</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* AMOUNT */}
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

                {/* DETAILS */}
                <View style={styles.detailsCard}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Recipient / Person</Text>
                        <Text style={styles.detailValue}>{transaction.person_name}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Type</Text>
                        <Text style={styles.detailValue}>{transaction.type}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Payment Mode</Text>
                        <Text style={styles.detailValue}>{transaction.payment_mode}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Date</Text>
                        <Text style={styles.detailValue}>
                            {formatDisplayDate(new Date(transaction.created_at))}
                        </Text>
                    </View>
                </View>

                {/* REMARKS */}
                <View style={styles.remarksSection}>
                    <Text style={styles.remarksTitle}>Remarks</Text>
                    <Text style={styles.remarksText}>
                        {transaction.remarks || 'No remarks'}
                    </Text>
                </View>

                {/* DOCUMENT */}
                {transaction.document_url && (
                    <View style={styles.documentSection}>
                        <Text style={styles.remarksTitle}>Supporting Document</Text>

                        <View style={styles.documentRow}>
                            <Text style={styles.documentIcon}>
                                {transaction.document_type === 'pdf' ? '📄' : '🖼️'}
                            </Text>

                            <View style={{flex: 1}}>
                                <Text style={styles.documentTitle}>Attachment</Text>
                                <Text style={styles.documentType}>
                                    {transaction.document_type?.toUpperCase()}
                                </Text>
                            </View>

                            <TouchableOpacity style={styles.viewButton} onPress={handleViewDocument}>
                                <Text style={styles.viewButtonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <View style={{height: 40}} />
            </ScrollView>

            {/* MODAL */}
            <Modal visible={previewVisible} transparent>
                <View style={styles.modalContainer}>
                    <Pressable style={styles.closeButton} onPress={() => setPreviewVisible(false)}>
                        <Text style={styles.closeText}>✕</Text>
                    </Pressable>

                    {previewUrl && (
                        <Image source={{uri: previewUrl}} style={styles.previewImage} />
                    )}
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default TransactionDetailScreen;
