import React from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import FieldErrorText from '../../components/common/FieldErrorText';
import {theme} from '../../config/theme.ts';
import {useTransactionEntryForm} from '../../hooks/useTransactionEntryForm';
import {formatDisplayDate} from '../../utils/formatters';
import {TransactionStyles} from './TransactionStyles';

const TransactionEntryScreen = ({navigation, route}: any) => {
    const editItem = route.params?.editItem;
    const orgCode = route.params?.orgCode;
    const form = useTransactionEntryForm(navigation, editItem, orgCode);

    return (
        <SafeAreaView style={TransactionStyles.container}>
            <View style={TransactionStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={TransactionStyles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={TransactionStyles.title}>
                    {form.isEdit ? 'Edit Transaction' : 'New Transaction'}
                </Text>
            </View>

            <ScrollView
                style={TransactionStyles.form}
                contentContainerStyle={TransactionStyles.formContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={TransactionStyles.heroCard}>
                    <Text style={TransactionStyles.heroEyebrow}>
                        {form.isEdit ? 'Update Entry' : 'Ledger Entry'}
                    </Text>
                    <Text style={TransactionStyles.heroTitle}>
                        {form.isEdit ? 'Refine this record' : `Record a ${form.type === 'income' ? 'collection' : 'payment'}`} with confidence.
                    </Text>
                    <Text style={TransactionStyles.heroSubtitle}>
                        {form.isEdit
                            ? 'Update details as needed and resubmit for approval.'
                            : 'Choose the flow, confirm the amount, and submit it for review in one pass.'}
                    </Text>
                </View>

                {form.errors.general ? (
                    <View style={TransactionStyles.errorBanner}>
                        <Text style={TransactionStyles.errorBannerTitle}>Please review this entry</Text>
                        <Text style={TransactionStyles.errorBannerText}>{form.errors.general}</Text>
                    </View>
                ) : null}

                <View style={TransactionStyles.sectionCard}>
                    <Text style={TransactionStyles.sectionTitle}>Transaction Type</Text>
                    <View style={TransactionStyles.segmentRow}>
                        <TouchableOpacity
                            style={[
                                TransactionStyles.segmentButton,
                                form.type === 'income' && TransactionStyles.segmentButtonIncome,
                            ]}
                            onPress={() => form.handleTypeChange('income')}
                        >
                            <Text
                                style={[
                                    TransactionStyles.segmentTitle,
                                    form.type === 'income' && TransactionStyles.segmentTitleActive,
                                ]}
                            >
                                Income
                            </Text>
                            <Text style={TransactionStyles.segmentSubtitle}>Cash in</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                TransactionStyles.segmentButton,
                                form.type === 'expense' && TransactionStyles.segmentButtonExpense,
                            ]}
                            onPress={() => form.handleTypeChange('expense')}
                        >
                            <Text
                                style={[
                                    TransactionStyles.segmentTitle,
                                    form.type === 'expense' && TransactionStyles.segmentTitleActive,
                                ]}
                            >
                                Expense
                            </Text>
                            <Text style={TransactionStyles.segmentSubtitle}>Cash out</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={TransactionStyles.sectionCard}>
                    <View style={TransactionStyles.sectionHeader}>
                        <Text style={TransactionStyles.sectionTitle}>Core Details</Text>
                        <View style={TransactionStyles.amountChip}>
                            <Text style={TransactionStyles.amountChipLabel}>{form.amountHint}</Text>
                        </View>
                    </View>

                    <Text style={TransactionStyles.label}>Date</Text>
                    <TouchableOpacity
                        onPress={() => form.setShowDatePicker(true)}
                        style={TransactionStyles.inputShell}
                    >
                        <Text style={TransactionStyles.inputValue}>{formatDisplayDate(form.date)}</Text>
                        <Text style={TransactionStyles.inputMeta}>Pick date</Text>
                    </TouchableOpacity>
                    {form.showDatePicker ? (
                        <DateTimePicker
                            value={form.date}
                            mode="date"
                            display="default"
                            onChange={form.handleDateChange}
                        />
                    ) : null}

                    <Text style={TransactionStyles.label}>Amount</Text>
                    <View
                        style={[
                            TransactionStyles.inputShell,
                            form.errors.amount && TransactionStyles.inputShellError,
                        ]}
                    >
                        <Text style={TransactionStyles.currencyPrefix}>₹</Text>
                        <TextInput
                            style={TransactionStyles.amountInput}
                            placeholder="0.00"
                            placeholderTextColor={theme.colors.placeholder}
                            keyboardType="numeric"
                            value={form.amount}
                            onChangeText={value => {
                                form.setAmount(value);
                                form.updateFieldError('amount', value);
                            }}
                        />
                    </View>
                    <FieldErrorText message={form.errors.amount} />

                    <Text style={TransactionStyles.label}>{form.personLabel}</Text>
                    <TextInput
                        style={[
                            TransactionStyles.textInput,
                            form.errors.personName && TransactionStyles.inputShellError,
                        ]}
                        placeholder={form.personPlaceholder}
                        placeholderTextColor={theme.colors.placeholder}
                        value={form.personName}
                        onChangeText={value => {
                            form.setPersonName(value);
                            form.updateFieldError('personName', value);
                        }}
                    />
                    <FieldErrorText message={form.errors.personName} />
                </View>

                <View style={TransactionStyles.sectionCard}>
                    <Text style={TransactionStyles.sectionTitle}>Payment Trail</Text>
                    <View style={TransactionStyles.segmentRow}>
                        <TouchableOpacity
                            style={[
                                TransactionStyles.segmentButtonSmall,
                                form.paymentMode === 'cash' &&
                                    TransactionStyles.segmentButtonNeutralActive,
                            ]}
                            onPress={() => form.handlePaymentModeChange('cash')}
                        >
                            <Text style={TransactionStyles.segmentTitle}>Cash</Text>
                            <Text style={TransactionStyles.segmentSubtitle}>No transfer ID</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                TransactionStyles.segmentButtonSmall,
                                form.paymentMode === 'online' &&
                                    TransactionStyles.segmentButtonNeutralActive,
                            ]}
                            onPress={() => form.handlePaymentModeChange('online')}
                        >
                            <Text style={TransactionStyles.segmentTitle}>Online</Text>
                            <Text style={TransactionStyles.segmentSubtitle}>Keep transfer proof</Text>
                        </TouchableOpacity>
                    </View>

                    {form.paymentMode === 'online' ? (
                        <>
                            <Text style={TransactionStyles.label}>Transaction ID</Text>
                            <TextInput
                                style={[
                                    TransactionStyles.textInput,
                                    form.errors.transactionId && TransactionStyles.inputShellError,
                                ]}
                                placeholder="e.g. txn_123abc456"
                                placeholderTextColor={theme.colors.placeholder}
                                value={form.transactionId}
                                onChangeText={value => {
                                    form.setTransactionId(value);
                                    form.updateFieldError('transactionId', value);
                                }}
                                autoCapitalize="none"
                            />
                            <FieldErrorText message={form.errors.transactionId} />
                        </>
                    ) : (
                        <View style={TransactionStyles.infoStrip}>
                            <Text style={TransactionStyles.infoStripText}>
                                Cash selected. No transaction ID is needed for this entry.
                            </Text>
                        </View>
                    )}

                    <Text style={TransactionStyles.label}>Receipt / Bill No.</Text>
                    <TextInput
                        style={TransactionStyles.textInput}
                        placeholder="Optional reference"
                        placeholderTextColor={theme.colors.placeholder}
                        value={form.referenceNo}
                        onChangeText={form.setReferenceNo}
                    />
                </View>

                <View style={TransactionStyles.sectionCard}>
                    <Text style={TransactionStyles.sectionTitle}>Notes</Text>
                    <TextInput
                        style={[TransactionStyles.textInput, TransactionStyles.multilineInput]}
                        placeholder="Add context that will help the reviewer."
                        placeholderTextColor={theme.colors.placeholder}
                        multiline
                        value={form.remarks}
                        onChangeText={form.setRemarks}
                    />
                </View>

                <View style={TransactionStyles.summaryCard}>
                    <Text style={TransactionStyles.summaryLabel}>Ready to submit</Text>
                    <Text style={TransactionStyles.summaryAmount}>
                        {form.amountValue > 0 ? `₹${form.amountValue.toLocaleString('en-IN')}` : '₹0'}
                    </Text>
                    <Text style={TransactionStyles.summaryMeta}>
                        {form.type === 'income' ? 'Income' : 'Expense'} •{' '}
                        {form.paymentMode === 'online' ? 'Online' : 'Cash'}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[
                        TransactionStyles.submitButton,
                        form.isLoading && TransactionStyles.submitButtonDisabled,
                    ]}
                    onPress={form.onSubmit}
                    disabled={form.isLoading}
                >
                    <Text style={TransactionStyles.submitText}>
                        {form.isLoading
                            ? form.isEdit
                                ? 'Updating...'
                                : 'Submitting...'
                            : form.isEdit
                            ? 'Update Transaction'
                            : 'Submit Transaction'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TransactionEntryScreen;
