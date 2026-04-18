import React, {useState} from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Image,
    Pressable,
    ActivityIndicator
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TransactionDetailScreenStyles as styles} from './TransactionDetailScreenStyles';
import {formatDisplayDate} from '../../utils/formatters';
import {useTransactionList} from '../../hooks/useTransactionList';
import {theme} from '../../config/theme';
import {BACKEND_URL} from "../../store/baseQuery.ts";
import {useGetTransactionQuery} from "../../store/transactionApi";
import AppFooter from '../../components/AppFooter';
import AppHeader from '../../components/AppHeader';

const TransactionDetailScreen = ({route, navigation}: any) => {
    const {transaction: initialTransaction, orgCode} = route.params;
    
    // Fetch latest data for this specific transaction
    const {data, isLoading: isQueryLoading, isFetching} = useGetTransactionQuery(
        { id: initialTransaction.id, orgCode },
        { 
            // Ensures we refetch if the tag is invalidated (e.g. after edit)
            refetchOnMountOrArgChange: true 
        }
    );
    
    const transaction = data?.transaction ?? initialTransaction;
    const {handleDelete, isUpdating: isActionUpdating, isAdmin, user} = useTransactionList(orgCode);
    const isUpdating = isActionUpdating || isQueryLoading;

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const isNotApproved = transaction.status === 'pending' || transaction.status === 'rejected';
    const canEdit = isNotApproved && (isAdmin || transaction.created_by === user?.id);
    const canDelete = isNotApproved && (isAdmin || transaction.created_by === user?.id);

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
            orgCode: orgCode,
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
            <AppHeader />

            <View style={styles.inlineHeader}>
                <TouchableOpacity 
                    style={styles.inlineBackButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.inlineBackIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.inlineTitle}>Transaction Details</Text>
                {isFetching && (
                    <ActivityIndicator size="small" color={theme.colors.primary} style={{ marginLeft: 10 }} />
                )}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingBottom: 100 }}>
                    {/* AMOUNT */}
                    <View style={styles.amountContainer}>
                        <Text style={styles.amountLabel}>Total Amount</Text>
                        <Text style={[
                            styles.amountValue,
                            {color: transaction.type === 'income' ? theme.colors.success : theme.colors.danger}
                        ]}>
                            {transaction.type === 'income' ? '+' : '-'} ₹{parseFloat(transaction.amount || '0').toLocaleString('en-IN')}
                        </Text>
                    </View>
                    
                    <View style={[styles.statusBadge, {backgroundColor: statusStyle.bg, borderColor: statusStyle.bg}]}>
                        <Text style={[styles.statusText, {color: statusStyle.text}]}>
                            {statusStyle.label}
                        </Text>
                    </View>

                    {/* DETAILS */}
                    <View style={styles.detailsCard}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Recipient / Person</Text>
                            <Text style={styles.detailValue}>{transaction.person_name}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Transaction Type</Text>
                            <Text style={[styles.detailValue, {textTransform: 'capitalize'}]}>{transaction.type}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Payment Mode</Text>
                            <Text style={[styles.detailValue, {textTransform: 'capitalize'}]}>{transaction.payment_mode}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Transaction Date</Text>
                            <Text style={styles.detailValue}>
                                {formatDisplayDate(new Date(transaction.transaction_date))}
                            </Text>
                        </View>
                    </View>

                    {/* REMARKS */}
                    <Text style={styles.sectionTitle}>Remarks & Notes</Text>
                    <View style={styles.remarksSection}>
                        <Text style={styles.remarksText}>
                            {transaction.remarks || 'No internal remarks provided for this transaction.'}
                        </Text>
                    </View>

                    {/* DOCUMENT */}
                    {transaction.document_url && (
                        <>
                            <Text style={styles.sectionTitle}>Supporting Document</Text>
                            <View style={styles.documentSection}>
                                <View style={styles.documentRow}>
                                    <View style={styles.documentIconContainer}>
                                        <Text style={styles.documentIcon}>
                                            {transaction.document_type === 'pdf' ? '📄' : '🖼️'}
                                        </Text>
                                    </View>

                                    <View style={styles.documentInfo}>
                                        <Text style={styles.documentTitle}>Receipt / Attachment</Text>
                                        <Text style={styles.documentType}>
                                            {transaction.document_type?.toUpperCase()} FILE
                                        </Text>
                                    </View>

                                    <TouchableOpacity style={styles.viewButton} onPress={handleViewDocument}>
                                        <Text style={styles.viewButtonText}>View</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    )}

                    {(canEdit || canDelete) && (
                        <View style={styles.actionButtonsContainer}>
                            {canDelete && (
                                <TouchableOpacity 
                                    style={styles.deleteButton} 
                                    onPress={confirmDelete}
                                    disabled={isUpdating}
                                >
                                    <Text style={styles.deleteButtonText}>Delete Record</Text>
                                </TouchableOpacity>
                            )}
                            {canEdit && (
                                <TouchableOpacity 
                                    style={styles.editButton} 
                                    onPress={handleEdit}
                                    disabled={isUpdating}
                                >
                                    <Text style={styles.editButtonText}>Edit Details</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>

            <AppFooter navigation={navigation} activeTab="none" />

            {/* MODAL */}
            <Modal visible={previewVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <Pressable style={styles.closeButton} onPress={() => setPreviewVisible(false)}>
                        <Text style={styles.closeText}>✕</Text>
                    </Pressable>

                    {previewUrl && (
                        <Image source={{uri: previewUrl}} style={styles.previewImage} resizeMode="contain" />
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default TransactionDetailScreen;
