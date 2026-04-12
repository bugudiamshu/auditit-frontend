import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TransactionStyles } from "./TransactionStyles";
import { useCreateTransactionMutation } from "../../store/transactionApi";
import { useRoute } from '@react-navigation/native';
import { theme } from "../../config/theme.ts";
import { useSnackbar } from '../../context/SnackbarContext'; // Import useSnackbar

const TransactionEntryScreen = ({ navigation }: any) => {
    const route = useRoute<any>();
    const society = route.params?.society;

    const [type, setType] = useState<'income' | 'expense'>('income');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [referenceNo, setReferenceNo] = useState('');
    const [paymentMode, setPaymentMode] = useState<'cash' | 'online'>('cash');
    const [transactionId, setTransactionId] = useState('');
    const [personName, setPersonName] = useState('');
    const [amount, setAmount] = useState('');
    const [remarks, setRemarks] = useState('');

    const [createTransaction, { isLoading }] = useCreateTransactionMutation();
    const { show: showSnackbar } = useSnackbar(); // Get show Snackbar function

    const handleDateChange = useCallback((event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios'); // Keep picker open on iOS until done
        setDate(currentDate);
    }, [date]); // Dependency on date to ensure correct state updates

    const onSubmit = useCallback(async () => {
        if (!amount || parseFloat(amount) <= 0) {
            showSnackbar('Please enter a valid amount.', 'error');
            return;
        }
        if (paymentMode === 'online' && !transactionId) {
            showSnackbar('Please enter the Transaction ID for online payments.', 'error');
            return;
        }
        if (!personName) {
            showSnackbar(`Please enter ${type === 'income' ? 'Collected By' : 'Sent To'}.`, 'error');
            return;
        }

        const payload = {
            type,
            transaction_date: date.toISOString().split('T')[0], // Format to YYYY-MM-DD
            amount: parseFloat(amount),
            payment_mode: paymentMode,
            reference_no: referenceNo || null,
            transaction_id: paymentMode === 'online' ? transactionId : null,
            person_name: personName,
            remarks: remarks || null,
        };

        try {
            const response = await createTransaction(payload).unwrap();
            showSnackbar(response.message || 'Transaction submitted successfully.', 'success');
            navigation.goBack(); // Go back after successful submission
        } catch (error: any) {
            console.error("Create transaction error:", error);
            showSnackbar(error?.data?.message || 'Failed to create transaction.', 'error');
        }
    }, [type, date, amount, paymentMode, referenceNo, transactionId, personName, remarks, createTransaction, showSnackbar, navigation]);

    // Handlers for type and payment mode changes might be simple setters,
    // but if they become complex, they could also be wrapped in useCallback.
    // For now, direct setters are fine.

    return (
        <SafeAreaView style={TransactionStyles.container}>
            <View style={TransactionStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ color: theme.colors.primary, marginRight: theme.spacing.xs }}>← Back</Text>
                </TouchableOpacity>
                <Text style={TransactionStyles.title}>New Transaction</Text>
            </View>

            <ScrollView style={TransactionStyles.form}>
                <Text style={TransactionStyles.label}>Type</Text>
                <View style={TransactionStyles.typeContainer}>
                    <TouchableOpacity
                        style={[
                            TransactionStyles.typeButton,
                            type === 'income' && TransactionStyles.activeIncome,
                        ]}
                        onPress={() => { setType('income'); setPaymentMode('cash'); }} // Reset payment mode for income
                    >
                        <Text style={{ color: type === 'income' ? theme.colors.success : theme.colors.textPrimary }}>Income</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            TransactionStyles.typeButton,
                            type === 'expense' && TransactionStyles.activeExpense,
                        ]}
                        onPress={() => { setType('expense'); setPaymentMode('cash'); }} // Reset payment mode for expense
                    >
                        <Text style={{ color: type === 'expense' ? theme.colors.danger : theme.colors.textPrimary }}>Expense</Text>
                    </TouchableOpacity>
                </View>

                <Text style={TransactionStyles.label}>Date</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={TransactionStyles.input}>
                    <Text style={{ color: theme.colors.textPrimary }}>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                <Text style={TransactionStyles.label}>Amount</Text>
                <TextInput
                    style={TransactionStyles.input}
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />

                <Text style={TransactionStyles.label}>Payment Mode</Text>
                <View style={TransactionStyles.row}>
                    <TouchableOpacity
                        style={[
                            TransactionStyles.halfInput,
                            TransactionStyles.typeButton,
                            paymentMode === 'cash' && { backgroundColor: theme.colors.overlay } // Using theme color for active state
                        ]}
                        onPress={() => setPaymentMode('cash')}
                    >
                        <Text style={{ color: paymentMode === 'cash' ? theme.colors.primary : theme.colors.textPrimary }}>Cash</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            TransactionStyles.halfInput,
                            TransactionStyles.typeButton,
                            paymentMode === 'online' && { backgroundColor: theme.colors.overlay } // Using theme color for active state
                        ]}
                        onPress={() => setPaymentMode('online')}
                    >
                        <Text style={{ color: paymentMode === 'online' ? theme.colors.primary : theme.colors.textPrimary }}>Online</Text>
                    </TouchableOpacity>
                </View>

                {paymentMode === 'online' && (
                    <>
                        <Text style={TransactionStyles.label}>Transaction ID</Text>
                        <TextInput
                            style={TransactionStyles.input}
                            placeholder="e.g., txn_123abc456"
                            value={transactionId}
                            onChangeText={setTransactionId}
                        />
                    </>
                )}

                <Text style={TransactionStyles.label}>{type === 'income' ? 'Collected By' : 'Sent To'}</Text>
                <TextInput
                    style={TransactionStyles.input}
                    placeholder={type === 'income' ? 'Payer Name' : 'Recipient Name'}
                    value={personName}
                    onChangeText={setPersonName}
                />

                <Text style={TransactionStyles.label}>Receipt/Bill No. (Optional)</Text>
                <TextInput
                    style={TransactionStyles.input}
                    placeholder="e.g., INV-001"
                    value={referenceNo}
                    onChangeText={setReferenceNo}
                />

                <Text style={TransactionStyles.label}>Remarks (Optional)</Text>
                <TextInput
                    style={[TransactionStyles.input, { height: 100, textAlignVertical: 'top' }]}
                    placeholder="Add any additional details"
                    multiline
                    value={remarks}
                    onChangeText={setRemarks}
                />

                <TouchableOpacity
                    style={TransactionStyles.submitButton}
                    onPress={onSubmit}
                    disabled={isLoading}
                >
                    <Text style={TransactionStyles.submitText}>
                        {isLoading ? 'Submitting...' : 'Submit Transaction'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TransactionEntryScreen;
