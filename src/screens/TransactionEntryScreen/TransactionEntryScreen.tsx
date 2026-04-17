import React from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppHeader from '../../components/AppHeader.tsx';
import FieldErrorText from '../../components/common/FieldErrorText';
import {theme} from '../../config/theme.ts';
import {useTransactionEntryForm} from '../../hooks/useTransactionEntryForm';
import {formatDisplayDate} from '../../utils/formatters';
import {TransactionStyles as styles} from './TransactionStyles';

const TransactionEntryScreen = ({navigation, route}: any) => {
    const editItem = route.params?.editItem;
    const orgCode = route.params?.orgCode;
    const form = useTransactionEntryForm(navigation, editItem, orgCode);

    const isIncome = form.type === 'income';

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader 
                pageTitle={form.isEdit ? 'Edit Record' : 'New Record'} 
            />

            <ScrollView
                style={styles.form}
                contentContainerStyle={styles.formContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.pageHeader}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 6}}>
                        <TouchableOpacity 
                            onPress={() => navigation.goBack()}
                            style={styles.inlineBackButton}
                        >
                            <Text style={styles.inlineBackIcon}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.pageTitle}>
                            {form.isEdit ? 'Update Details' : 'Add Transaction'}
                        </Text>
                    </View>
                    <Text style={styles.pageSubtitle}>
                        {form.isEdit 
                            ? 'Adjust the existing record below.' 
                            : 'Enter the financial details to keep the ledger accurate.'}
                    </Text>
                </View>

                {form.errors.general ? (
                    <View style={styles.errorBanner}>
                        <Text style={{fontSize: 20}}>🚨</Text>
                        <Text style={styles.errorBannerText}>{form.errors.general}</Text>
                    </View>
                ) : null}

                <View style={styles.heroCard}>
                    <View style={styles.typeToggle}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[
                                styles.typeButton,
                                isIncome && styles.typeButtonActiveIncome,
                            ]}
                            onPress={() => form.handleTypeChange('income')}
                        >
                            <Text
                                style={[
                                    styles.typeText,
                                    isIncome && styles.typeTextActiveIncome,
                                ]}
                            >
                                📥 Income
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[
                                styles.typeButton,
                                !isIncome && styles.typeButtonActiveExpense,
                            ]}
                            onPress={() => form.handleTypeChange('expense')}
                        >
                            <Text
                                style={[
                                    styles.typeText,
                                    !isIncome && styles.typeTextActiveExpense,
                                ]}
                            >
                                📤 Expense
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.amountContainer}>
                        <Text style={styles.amountLabel}>Total Amount</Text>
                        <View style={styles.amountWrapper}>
                            <Text style={[
                                styles.currencySymbol,
                                {color: isIncome ? theme.colors.success : theme.colors.danger}
                            ]}>₹</Text>
                            <TextInput
                                style={[
                                    styles.amountInput,
                                    {color: isIncome ? theme.colors.success : theme.colors.danger}
                                ]}
                                placeholder="0"
                                placeholderTextColor={theme.colors.slate300}
                                selectionColor={isIncome ? theme.colors.success : theme.colors.danger}
                                caretHidden={true}
                                keyboardType="numeric"
                                value={form.amount}
                                autoFocus={!form.isEdit}
                                onChangeText={value => {
                                    form.setAmount(value);
                                    form.updateFieldError('amount', value);
                                }}
                            />
                        </View>
                        <FieldErrorText message={form.errors.amount} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Primary Information</Text>
                    <View style={styles.card}>
                        <View style={styles.inputGroup}>
                            <View style={styles.labelRow}>
                                <Text style={styles.labelIcon}>🗓️</Text>
                                <Text style={styles.label}>Transaction Date</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => form.setShowDatePicker(true)}
                                style={styles.inputPressable}
                            >
                                <Text style={styles.inputPressableText}>
                                    {formatDisplayDate(form.date)}
                                </Text>
                                <Text style={styles.dateIcon}>📅</Text>
                            </TouchableOpacity>
                        </View>
                        {form.showDatePicker ? (
                            <DateTimePicker
                                value={form.date}
                                mode="date"
                                display="default"
                                onChange={form.handleDateChange}
                            />
                        ) : null}

                        <View style={styles.inputGroup}>
                            <View style={styles.labelRow}>
                                <Text style={styles.labelIcon}>👤</Text>
                                <Text style={styles.label}>{form.personLabel}</Text>
                            </View>
                            <TextInput
                                style={styles.textInput}
                                placeholder={form.personPlaceholder}
                                placeholderTextColor={theme.colors.slate400}
                                selectionColor={theme.colors.primary}
                                value={form.personName}
                                onChangeText={value => {
                                    form.setPersonName(value);
                                    form.updateFieldError('personName', value);
                                }}
                            />
                            <FieldErrorText message={form.errors.personName} />
                        </View>

                        <View style={styles.inputGroup}>
                            <View style={styles.labelRow}>
                                <Text style={styles.labelIcon}>💳</Text>
                                <Text style={styles.label}>Payment Mode</Text>
                            </View>
                            <View style={styles.modeToggle}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={[
                                        styles.modeButton,
                                        form.paymentMode === 'cash' && styles.modeButtonActive,
                                    ]}
                                    onPress={() => form.handlePaymentModeChange('cash')}
                                >
                                    <Text
                                        style={[
                                            styles.modeText,
                                            form.paymentMode === 'cash' && styles.modeTextActive,
                                        ]}
                                    >
                                        💵 Cash
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={[
                                        styles.modeButton,
                                        form.paymentMode === 'online' && styles.modeButtonActive,
                                    ]}
                                    onPress={() => form.handlePaymentModeChange('online')}
                                >
                                    <Text
                                        style={[
                                            styles.modeText,
                                            form.paymentMode === 'online' && styles.modeTextActive,
                                        ]}
                                    >
                                        🏦 Online
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {form.paymentMode === 'online' && (
                            <View style={styles.inputGroup}>
                                <View style={styles.labelRow}>
                                    <Text style={styles.labelIcon}>🆔</Text>
                                    <Text style={styles.label}>Transaction ID</Text>
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Ref # / Transaction ID"
                                    placeholderTextColor={theme.colors.slate400}
                                    selectionColor={theme.colors.primary}
                                    value={form.transactionId}
                                    onChangeText={value => {
                                        form.setTransactionId(value);
                                        form.updateFieldError('transactionId', value);
                                    }}
                                    autoCapitalize="none"
                                />
                                <FieldErrorText message={form.errors.transactionId} />
                            </View>
                        )}

                        <View style={[styles.inputGroup, {marginBottom: 0}]}>
                            <View style={styles.labelRow}>
                                <Text style={styles.labelIcon}>📝</Text>
                                <Text style={styles.label}>Receipt / Voucher No.</Text>
                            </View>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Optional Reference"
                                placeholderTextColor={theme.colors.slate400}
                                selectionColor={theme.colors.primary}
                                value={form.referenceNo}
                                onChangeText={form.setReferenceNo}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Remarks & Notes</Text>
                    <View style={styles.card}>
                        <TextInput
                            style={[styles.textInput, styles.multilineInput]}
                            placeholder="Add internal notes or context for the auditor..."
                            placeholderTextColor={theme.colors.slate400}
                            selectionColor={theme.colors.primary}
                            multiline
                            value={form.remarks}
                            onChangeText={form.setRemarks}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Supporting Document</Text>
                    <View style={styles.card}>
                        {form.document ? (
                            <View style={styles.documentBadge}>
                                <Text style={styles.documentIcon}>
                                    {form.document.mimeType?.includes('pdf') ? '📄' : '🖼️'}
                                </Text>
                                <View style={styles.documentInfo}>
                                    <Text style={styles.documentName} numberOfLines={1}>
                                        {form.document.name}
                                    </Text>
                                    <Text style={styles.documentSize}>
                                        {form.document.size ? `${(form.document.size / 1024).toFixed(1)} KB` : 'Ready to upload'}
                                    </Text>
                                </View>
                                <TouchableOpacity 
                                    style={styles.removeDocument}
                                    onPress={form.clearDocument}
                                >
                                    <Text style={styles.removeDocumentText}>✕</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity 
                                style={styles.uploadButton}
                                onPress={form.pickDocument}
                            >
                                <Text style={styles.uploadIcon}>📎</Text>
                                <Text style={styles.uploadText}>Upload Bill or Receipt</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={styles.submitButtonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                            styles.submitButton,
                            form.isLoading && styles.submitButtonDisabled,
                            {backgroundColor: isIncome ? theme.colors.success : theme.colors.primary}
                        ]}
                        onPress={form.onSubmit}
                        disabled={form.isLoading}
                    >
                        <Text style={styles.submitText}>
                            {form.isLoading
                                ? '⏳ Processing...'
                                : form.isEdit
                                ? '✅ Update Transaction'
                                : `🚀 Record ${isIncome ? 'Income' : 'Expense'}`}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.quickNav}>
                        <TouchableOpacity 
                            style={styles.quickNavLink}
                            onPress={() => navigation.navigate('MainApp', { screen: 'Dashboard' })}
                        >
                            <Text style={styles.quickNavLinkText}>Dashboard</Text>
                        </TouchableOpacity>
                        <View style={styles.quickNavDivider} />
                        <TouchableOpacity 
                            style={styles.quickNavLink}
                            onPress={() => navigation.navigate('MainApp', { screen: 'Transactions' })}
                        >
                            <Text style={styles.quickNavLinkText}>Transactions List</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomSpacer} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default TransactionEntryScreen;
