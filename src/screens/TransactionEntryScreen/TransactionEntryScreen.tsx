import React from 'react';
import {Modal, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppHeader from '../../components/AppHeader.tsx';
import FieldErrorText from '../../components/common/FieldErrorText';
import {theme} from '../../config/theme.ts';
import {useTransactionEntryForm} from '../../hooks/useTransactionEntryForm';
import {formatDisplayDate} from '../../utils/formatters';
import {TransactionStyles as styles} from './TransactionStyles';

import AppFooter from '../../components/AppFooter';

const TransactionEntryScreen = ({navigation, route}: any) => {
    const editItem = route.params?.editItem;
    const orgCode = route.params?.orgCode;
    const form = useTransactionEntryForm(navigation, editItem, orgCode);

    const isIncome = form.type === 'income';

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <AppHeader />
            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
                <View style={styles.formContent}>
                    <View style={styles.pageHeader}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity
                                style={styles.inlineBackButton}
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={styles.inlineBackIcon}>←</Text>
                            </TouchableOpacity>
                            <Text style={styles.pageTitle}>{form.isEdit ? 'Update Details' : 'New Entry'}</Text>
                        </View>
                        <Text style={styles.pageSubtitle}>
                            {form.isEdit
                                ? 'Adjust the existing record below.'
                                : 'Record a new cash or online transaction.'}
                        </Text>
                    </View>

                    {form.errors.general && (
                        <View style={styles.errorBanner}>
                            <Text style={{fontSize: 20}}>🚨</Text>
                            <Text style={styles.errorBannerText}>{form.errors.general}</Text>
                        </View>
                    )}

                    <View style={styles.heroCard}>
                        <View style={styles.typeToggle}>
                            <TouchableOpacity
                                style={[styles.typeButton, isIncome && styles.typeButtonActiveIncome]}
                                onPress={() => form.handleTypeChange('income')}
                            >
                                <Text style={[styles.typeText, isIncome && styles.typeTextActiveIncome]}>
                                    📥 Income
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.typeButton, !isIncome && styles.typeButtonActiveExpense]}
                                onPress={() => form.handleTypeChange('expense')}
                            >
                                <Text style={[styles.typeText, !isIncome && styles.typeTextActiveExpense]}>
                                    📤 Expense
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountLabel}>{form.amountHint}</Text>
                            <View style={styles.amountWrapper}>
                                <Text style={styles.currencySymbol}>₹</Text>
                                <TextInput
                                    style={styles.amountInput}
                                    placeholder="0"
                                    placeholderTextColor={theme.colors.textMuted}
                                    keyboardType="numeric"
                                    value={form.amount}
                                    onChangeText={val => {
                                        form.setAmount(val);
                                        form.updateFieldError('amount', val);
                                    }}
                                />
                            </View>
                            <FieldErrorText error={form.errors.amount} centered />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Primary Information</Text>
                        <View style={styles.card}>
                            <View style={styles.inputGroup}>
                                <View style={styles.labelRow}>
                                    <Text style={styles.labelIcon}>📅</Text>
                                    <Text style={styles.label}>Transaction Date</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.inputPressable}
                                    onPress={() => form.setShowDatePicker(true)}
                                >
                                    <Text style={styles.inputPressableText}>
                                        {formatDisplayDate(form.date)}
                                    </Text>
                                    <Text style={styles.dateIcon}>📅</Text>
                                </TouchableOpacity>
                                {form.showDatePicker && (
                                    <DateTimePicker
                                        value={form.date}
                                        mode="date"
                                        display="default"
                                        onChange={form.handleDateChange}
                                    />
                                )}
                            </View>

                            <View style={styles.inputGroup}>
                                <View style={styles.labelRow}>
                                    <Text style={styles.labelIcon}>👤</Text>
                                    <Text style={styles.label}>{form.externalLabel}</Text>
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={form.externalPlaceholder}
                                    placeholderTextColor={theme.colors.textMuted}
                                    value={form.personName}
                                    onChangeText={val => {
                                        form.setPersonName(val);
                                        form.updateFieldError('personName', val);
                                    }}
                                />
                                <FieldErrorText error={form.errors.personName} />
                            </View>

                            <View style={styles.inputGroup}>
                                <View style={styles.labelRow}>
                                    <Text style={styles.labelIcon}>👔</Text>
                                    <Text style={styles.label}>{form.internalLabel}</Text>
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={form.internalPlaceholder}
                                    placeholderTextColor={theme.colors.textMuted}
                                    value={form.staffName}
                                    onChangeText={val => {
                                        form.setStaffName(val);
                                        form.updateFieldError('staffName', val);
                                    }}
                                />
                                <FieldErrorText error={form.errors.staffName} />
                            </View>

                            <View style={[styles.inputGroup, {marginBottom: 0}]}>
                                <View style={styles.labelRow}>
                                    <Text style={styles.labelIcon}>📝</Text>
                                    <Text style={styles.label}>Receipt / Voucher No.</Text>
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Enter reference number (optional)"
                                    placeholderTextColor={theme.colors.textMuted}
                                    value={form.referenceNo}
                                    onChangeText={form.setReferenceNo}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Payment Details</Text>
                        <View style={styles.card}>
                            <View style={styles.modeToggle}>
                                <TouchableOpacity
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

                            {form.paymentMode === 'online' && (
                                <View style={[styles.inputGroup, {marginTop: 24, marginBottom: 0}]}>
                                    <View style={styles.labelRow}>
                                        <Text style={styles.labelIcon}>🆔</Text>
                                        <Text style={styles.label}>Transaction ID</Text>
                                    </View>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter UTR or Ref ID"
                                        placeholderTextColor={theme.colors.textMuted}
                                        value={form.transactionId}
                                        onChangeText={val => {
                                            form.setTransactionId(val);
                                            form.updateFieldError('transactionId', val);
                                        }}
                                    />
                                    <FieldErrorText error={form.errors.transactionId} />
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Remarks & Notes</Text>
                        <View style={styles.card}>
                            <TextInput
                                style={[styles.textInput, styles.multilineInput]}
                                placeholder="Add any internal notes here..."
                                placeholderTextColor={theme.colors.textMuted}
                                multiline
                                numberOfLines={4}
                                value={form.remarks}
                                onChangeText={form.setRemarks}
                            />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Supporting Document</Text>
                        <View style={styles.card}>
                            {!form.document ? (
                                <TouchableOpacity
                                    style={styles.uploadButton}
                                    onPress={() => form.setShowUploadChoice(true)}
                                >
                                    <Text style={styles.uploadIcon}>📎</Text>
                                    <Text style={styles.uploadText}>Upload Bill or Receipt</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.documentBadge}>
                                    <Text style={styles.documentIcon}>
                                        {form.document.type?.includes('pdf') ? '📄' : '🖼️'}
                                    </Text>
                                    <View style={styles.documentInfo}>
                                        <Text style={styles.documentName} numberOfLines={1}>
                                            {form.document.name}
                                        </Text>
                                        <Text style={styles.documentSize}>Attachment ready</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.removeDocument}
                                        onPress={form.clearDocument}
                                    >
                                        <Text style={styles.removeDocumentText}>✕</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.submitButtonContainer}>
                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                {backgroundColor: isIncome ? theme.colors.success : theme.colors.danger},
                                form.isLoading && styles.submitButtonDisabled,
                            ]}
                            onPress={form.onSubmit}
                            disabled={form.isLoading}
                        >
                            <Text style={styles.submitText}>
                                {form.isLoading
                                    ? 'Processing...'
                                    : form.isEdit
                                    ? 'Update Transaction'
                                    : `Submit ${form.type === 'income' ? 'Income' : 'Expense'}`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: 100}} />
            </ScrollView>

            <AppFooter navigation={navigation} activeTab="none" />

            {/* Upload Choice Modal */}
            <Modal
                visible={form.showUploadChoice}
                transparent
                animationType="slide"
                onRequestClose={() => form.setShowUploadChoice(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    activeOpacity={1} 
                    onPress={() => form.setShowUploadChoice(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Upload Attachment</Text>
                        <Text style={styles.modalSubtitle}>How would you like to add your bill or receipt?</Text>
                        
                        <View style={styles.choiceGrid}>
                            <TouchableOpacity style={styles.choiceButton} onPress={form.capturePhoto}>
                                <Text style={styles.choiceIcon}>📸</Text>
                                <Text style={styles.choiceText}>Camera</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.choiceButton} onPress={form.pickImage}>
                                <Text style={styles.choiceIcon}>🖼️</Text>
                                <Text style={styles.choiceText}>Gallery</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.choiceButton} onPress={form.pickDocument}>
                                <Text style={styles.choiceIcon}>📄</Text>
                                <Text style={styles.choiceText}>Files</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                            style={styles.cancelButton} 
                            onPress={() => form.setShowUploadChoice(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

export default TransactionEntryScreen;
