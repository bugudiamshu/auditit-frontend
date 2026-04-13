import React, {useState} from 'react';
import {ActivityIndicator, Alert, FlatList, Modal, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader.tsx';
import FeedbackState from '../../components/common/FeedbackState';
import FilterChips from '../../components/common/FilterChips';
import {theme} from '../../config/theme';
import {transactionFilters, useTransactionList} from '../../hooks/useTransactionList';
import TransactionCard from './components/TransactionCard';
import {TransactionListScreenStyles} from './TransactionListScreenStyles.ts';

const TransactionListScreen = ({navigation}: any) => {
    const {
        data,
        isLoading,
        isFetching,
        error,
        refetch,
        user,
        statusFilter,
        setStatusFilter,
        handleDecision,
        handleDelete,
        isUpdating,
        isFounder,
        societies,
        activeSociety,
        activeOrgCode,
        setSelectedOrgCode,
        isPortfolioLoading,
    } = useTransactionList();

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const confirmDelete = (id: number) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to permanently delete this transaction?',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Delete', style: 'destructive', onPress: () => handleDelete(id)},
            ],
        );
    };

    const handleEdit = (item: any) => {
        navigation.navigate('TransactionEntry', {
            editItem: item,
            orgCode: activeOrgCode,
        });
    };

    if (isLoading || isPortfolioLoading) {
        return (
            <View style={TransactionListScreenStyles.loader}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    const transactions = data?.data?.data || [];

    return (
        <SafeAreaView style={TransactionListScreenStyles.container}>
            <AppHeader pageTitle={'Transactions'} />

            {isFounder && societies.length ? (
                <View style={TransactionListScreenStyles.dropdownContainer}>
                    <Text style={TransactionListScreenStyles.dropdownLabel}>Active Society</Text>
                    <TouchableOpacity
                        style={TransactionListScreenStyles.dropdownSelector}
                        onPress={() => setIsDropdownVisible(true)}
                    >
                        <Text style={TransactionListScreenStyles.dropdownValue}>
                            {activeSociety?.name ?? 'Select Society'}
                        </Text>
                        <Text style={TransactionListScreenStyles.dropdownChevron}>▼</Text>
                    </TouchableOpacity>

                    <Modal
                        visible={isDropdownVisible}
                        transparent
                        animationType="slide"
                        onRequestClose={() => setIsDropdownVisible(false)}
                    >
                        <TouchableOpacity
                            style={TransactionListScreenStyles.modalOverlay}
                            activeOpacity={1}
                            onPress={() => setIsDropdownVisible(false)}
                        >
                            <View style={TransactionListScreenStyles.modalContent}>
                                <View style={TransactionListScreenStyles.modalHeader}>
                                    <Text style={TransactionListScreenStyles.modalTitle}>Choose Society</Text>
                                    <TouchableOpacity
                                        onPress={() => setIsDropdownVisible(false)}
                                        style={TransactionListScreenStyles.closeButton}
                                    >
                                        <Text style={TransactionListScreenStyles.closeText}>Close</Text>
                                    </TouchableOpacity>
                                </View>

                                <FlatList
                                    data={societies}
                                    keyExtractor={item => item.org_code}
                                    renderItem={({item}) => (
                                        <TouchableOpacity
                                            style={[
                                                TransactionListScreenStyles.societyOption,
                                                item.org_code === activeOrgCode && TransactionListScreenStyles.societyOptionActive
                                            ]}
                                            onPress={() => {
                                                setSelectedOrgCode(item.org_code);
                                                setIsDropdownVisible(false);
                                            }}
                                        >
                                            <Text style={TransactionListScreenStyles.societyOptionText}>{item.name}</Text>
                                            <Text style={TransactionListScreenStyles.societyOptionCode}>{item.org_code}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            ) : null}

            <View style={TransactionListScreenStyles.filtersRow}>
                <FilterChips
                    options={transactionFilters}
                    value={statusFilter}
                    onChange={setStatusFilter}
                />
            </View>

            {error ? (
                <FeedbackState
                    title="Could not load transactions"
                    actionLabel="Try again"
                    onAction={refetch}
                />
            ) : null}

            <FlatList
                data={transactions}
                renderItem={({item}) => (
                    <TransactionCard
                        item={item}
                        isFounder={isFounder}
                        currentUserId={user?.id}
                        isUpdating={isUpdating}
                        onApprove={id => handleDecision(id, 'approved')}
                        onReject={id => handleDecision(id, 'rejected')}
                        onEdit={handleEdit}
                        onDelete={confirmDelete}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={TransactionListScreenStyles.list}
                showsVerticalScrollIndicator={false}
                onRefresh={refetch}
                refreshing={isFetching}
                ListEmptyComponent={
                    !error ? (
                        <FeedbackState
                            title={isFounder ? 'No transactions for this society' : 'No transactions yet'}
                            description={
                                isFounder
                                    ? 'Select another society or wait for new entries to review.'
                                    : 'Create a new entry to start building the ledger.'
                            }
                        />
                    ) : null
                }
            />

            {!isFounder ? (
                <TouchableOpacity
                    style={TransactionListScreenStyles.fab}
                    onPress={() => navigation.navigate('TransactionEntry')}
                    activeOpacity={0.8}
                >
                    <Text style={TransactionListScreenStyles.fabIcon}>＋</Text>
                </TouchableOpacity>
            ) : null}
        </SafeAreaView>
    );
};

export default TransactionListScreen;
