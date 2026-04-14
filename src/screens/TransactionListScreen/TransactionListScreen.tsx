import React, {useState, useRef, useEffect} from 'react';
import {ActivityIndicator, Alert, Modal, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SwipeListView} from 'react-native-swipe-list-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppHeader from '../../components/AppHeader.tsx';
import FeedbackState from '../../components/common/FeedbackState';
import FilterChips from '../../components/common/FilterChips';
import {theme} from '../../config/theme';
import {transactionFilters, useTransactionList} from '../../hooks/useTransactionList';
import TransactionCard from './components/TransactionCard';
import {TransactionListScreenStyles} from './TransactionListScreenStyles.ts';
import {formatDisplayDate} from '../../utils/formatters';

const TransactionListScreen = ({navigation}: any) => {
    const {
        isLoading,
        isFetching,
        error,
        refetch,
        user,
        statusFilter,
        setStatusFilter,
        typeFilter,
        setTypeFilter,
        sortBy,
        setSortBy,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        groupedTransactions,
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
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [isSortModalVisible, setIsSortModalVisible] = useState(false);

    // State for local modal selection before applying
    const [localStatus, setLocalStatus] = useState(statusFilter);
    const [localType, setLocalType] = useState(typeFilter);
    const [localStartDate, setLocalStartDate] = useState(startDate);
    const [localEndDate, setLocalEndDate] = useState(endDate);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    useEffect(() => {
        if (isFilterModalVisible) {
            setLocalStatus(statusFilter);
            setLocalType(typeFilter);
            setLocalStartDate(startDate);
            setLocalEndDate(endDate);
        }
    }, [isFilterModalVisible, statusFilter, typeFilter, startDate, endDate]);

    const [swipeValues, setSwipeValues] = useState<Record<string, number>>({});
    const [pendingActions, setPendingActions] = useState<Record<number, {action: 'approved' | 'rejected'; timer: any; seconds: number}>>({});
    const timersRef = useRef<Record<number, any>>({});

    useEffect(() => {
        return () => {
            Object.values(timersRef.current).forEach(clearInterval);
        };
    }, []);

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

    const handlePress = (item: any) => {
        navigation.navigate('TransactionDetail', {
            transaction: item,
        });
    };

    const onSwipeAction = (item: any, action: 'approved' | 'rejected') => {
        if (pendingActions[item.id]) return;

        const timerId = setInterval(() => {
            setPendingActions(prev => {
                if (!prev[item.id]) {
                    clearInterval(timerId);
                    return prev;
                }
                if (prev[item.id].seconds <= 1) {
                    clearInterval(timerId);
                    handleDecision(item.id, action);
                    const next = {...prev};
                    delete next[item.id];
                    return next;
                }
                return {
                    ...prev,
                    [item.id]: {...prev[item.id], seconds: prev[item.id].seconds - 1},
                };
            });
        }, 1000);

        timersRef.current[item.id] = timerId;
        setPendingActions(prev => ({
            ...prev,
            [item.id]: {action, timer: timerId, seconds: 5},
        }));
    };

    const handleUndo = (id: number) => {
        if (timersRef.current[id]) {
            clearInterval(timersRef.current[id]);
            delete timersRef.current[id];
        }
        setPendingActions(prev => {
            const next = {...prev};
            delete next[id];
            return next;
        });
    };

    const sortOptions = [
        {label: 'Newest First', value: 'date_desc'},
        {label: 'Oldest First', value: 'date_asc'},
        {label: 'Price: High to Low', value: 'amount_desc'},
        {label: 'Price: Low to High', value: 'amount_asc'},
    ];

    const currentSortLabel = "Sort By";
    const activeFilterCount = [statusFilter, typeFilter, startDate, endDate].filter(Boolean).length;

    const renderItem = (row: any) => {
        const {item} = row;
        const pending = pendingActions[item.id];

        if (pending) {
            return (
                <View style={TransactionListScreenStyles.undoCard}>
                    <Text style={TransactionListScreenStyles.undoText}>
                        Transaction {pending.action} in {pending.seconds}s...
                    </Text>
                    <TouchableOpacity
                        onPress={() => handleUndo(item.id)}
                        style={TransactionListScreenStyles.undoButton}
                    >
                        <Text style={TransactionListScreenStyles.undoButtonText}>UNDO</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <TransactionCard
                item={item}
                isFounder={isFounder}
                currentUserId={user?.id}
                isUpdating={isUpdating}
                onEdit={handleEdit}
                onDelete={confirmDelete}
                onPress={handlePress}
            />
        );
    };

    const renderHiddenItem = (row: any) => {
        const {item} = row;
        if (pendingActions[item.id] || item.status !== 'pending' || !isFounder) return null;

        const swipeValue = swipeValues[item.id.toString()] || 0;

        return (
            <View style={TransactionListScreenStyles.rowBack}>
                {swipeValue > 0 && (
                    <View style={[TransactionListScreenStyles.backRightBtn, TransactionListScreenStyles.backRightBtnLeft]}>
                        <View style={TransactionListScreenStyles.backActionContent}>
                            <Text style={TransactionListScreenStyles.backArrow}>→ → →</Text>
                            <Text style={TransactionListScreenStyles.backTextWhite}>Approve</Text>
                        </View>
                    </View>
                )}
                {swipeValue < 0 && (
                    <View style={[TransactionListScreenStyles.backRightBtn, TransactionListScreenStyles.backRightBtnRight]}>
                        <View style={TransactionListScreenStyles.backActionContent}>
                            <Text style={[TransactionListScreenStyles.backArrow, TransactionListScreenStyles.backArrowRight]}>← ← ←</Text>
                            <Text style={[TransactionListScreenStyles.backTextWhite, TransactionListScreenStyles.backTextRed]}>Reject</Text>
                        </View>
                    </View>
                )}
            </View>
        );
    };

    if (isLoading || isPortfolioLoading) {
        return (
            <View style={TransactionListScreenStyles.loader}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={TransactionListScreenStyles.container} edges={['top']}>
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
                </View>
            ) : null}

            <View style={TransactionListScreenStyles.mainCard}>
                {/* Integrated Filter Bar */}
                <View style={TransactionListScreenStyles.filterBarContainer}>
                    <View style={TransactionListScreenStyles.searchBarWrapper}>
                        <Text style={TransactionListScreenStyles.iconText}>🔍</Text>
                        <Text style={TransactionListScreenStyles.searchPlaceholder}>Search transactions...</Text>
                    </View>
                    
                    <View style={TransactionListScreenStyles.filterActions}>
                        <TouchableOpacity
                            style={TransactionListScreenStyles.iconButton}
                            onPress={() => setIsSortModalVisible(true)}
                        >
                            <Text style={TransactionListScreenStyles.iconText}>⇅</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                TransactionListScreenStyles.iconButton,
                                activeFilterCount > 0 && TransactionListScreenStyles.iconButtonActive
                            ]}
                            onPress={() => setIsFilterModalVisible(true)}
                        >
                            <Text style={[
                                TransactionListScreenStyles.iconText,
                                activeFilterCount > 0 && {color: '#FFF'}
                            ]}>⚡</Text>
                            {activeFilterCount > 0 && (
                                <View style={TransactionListScreenStyles.activeFilterBadge}>
                                    <Text style={TransactionListScreenStyles.activeFilterText}>{activeFilterCount}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {error ? (
                    <FeedbackState
                        title="Could not load transactions"
                        actionLabel="Try again"
                        onAction={refetch}
                    />
                ) : (
                    <SwipeListView
                        useSectionList
                        sections={groupedTransactions}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        renderSectionHeader={({section: {title}}) => (
                            <View style={TransactionListScreenStyles.sectionHeader}>
                                <Text style={TransactionListScreenStyles.sectionTitle}>{title}</Text>
                                <View style={TransactionListScreenStyles.sectionLine} />
                            </View>
                        )}
                        leftOpenValue={150}
                        rightOpenValue={-150}
                        swipeToOpenPercent={60}
                        onSwipeValueChange={(swipeData) => {
                            const {key, value} = swipeData;
                            setSwipeValues(prev => ({...prev, [key]: value}));
                        }}
                        onRowOpen={(rowKey, rowMap, toValue) => {
                            const allData = groupedTransactions.flatMap(s => s.data);
                            const item = allData.find(t => t.id.toString() === rowKey);
                            if (item && isFounder && item.status === 'pending' && !pendingActions[item.id]) {
                                const action = toValue > 0 ? 'approved' : 'rejected';
                                rowMap[rowKey]?.closeRow();
                                onSwipeAction(item, action);
                            }
                        }}
                        previewRowKey={'0'}
                        previewOpenValue={-60}
                        previewOpenDelay={3000}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={TransactionListScreenStyles.list}
                        showsVerticalScrollIndicator={false}
                        onRefresh={refetch}
                        refreshing={isFetching}
                        disableRightSwipe={!isFounder}
                        disableLeftSwipe={!isFounder}
                        ListEmptyComponent={
                            !error && !isFetching ? (
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
                )}
            </View>

            {/* Society Modal */}
            <Modal
                visible={isDropdownVisible}
                transparent
                animationType="fade"
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
                            <TouchableOpacity onPress={() => setIsDropdownVisible(false)}>
                                <Text style={TransactionListScreenStyles.closeText}>Close</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                            {societies.map((item) => (
                                <TouchableOpacity
                                    key={item.org_code}
                                    style={[
                                        TransactionListScreenStyles.societyOption,
                                        item.org_code === activeOrgCode && TransactionListScreenStyles.societyOptionActive
                                    ]}
                                    onPress={() => {
                                        setSelectedOrgCode(item.org_code);
                                        setIsDropdownVisible(false);
                                    }}
                                >
                                    <View style={{flex: 1}}>
                                        <Text style={TransactionListScreenStyles.societyOptionText}>{item.name}</Text>
                                        <Text style={TransactionListScreenStyles.societyOptionCode}>{item.org_code}</Text>
                                    </View>
                                    {item.org_code === activeOrgCode && (
                                        <Text style={TransactionListScreenStyles.sortCheck}>✓</Text>
                                    )}
                                </TouchableOpacity>
                            ))}
                            <View style={{height: 40}} />
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Sort Modal */}
            <Modal
                visible={isSortModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setIsSortModalVisible(false)}
            >
                <TouchableOpacity
                    style={TransactionListScreenStyles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsSortModalVisible(false)}
                >
                    <View style={TransactionListScreenStyles.modalContent}>
                        <View style={TransactionListScreenStyles.modalHeader}>
                            <Text style={TransactionListScreenStyles.modalTitle}>Sort By</Text>
                            <TouchableOpacity onPress={() => setIsSortModalVisible(false)}>
                                <Text style={TransactionListScreenStyles.closeText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {sortOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={TransactionListScreenStyles.sortOption}
                                    onPress={() => {
                                        setSortBy(option.value as any);
                                        setIsSortModalVisible(false);
                                    }}
                                >
                                    <Text style={[
                                        TransactionListScreenStyles.sortOptionText,
                                        sortBy === option.value && TransactionListScreenStyles.sortOptionActiveText
                                    ]}>
                                        {option.label}
                                    </Text>
                                    {sortBy === option.value && <Text style={TransactionListScreenStyles.sortCheck}>✓</Text>}
                                </TouchableOpacity>
                            ))}
                            <View style={{height: 40}} />
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Filter Modal */}
            <Modal
                visible={isFilterModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setIsFilterModalVisible(false)}
            >
                <TouchableOpacity
                    style={TransactionListScreenStyles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsFilterModalVisible(false)}
                >
                    <View style={TransactionListScreenStyles.modalContent}>
                        <View style={TransactionListScreenStyles.modalHeader}>
                            <Text style={TransactionListScreenStyles.modalTitle}>Filters</Text>
                            <TouchableOpacity onPress={() => setIsFilterModalVisible(false)}>
                                <Text style={TransactionListScreenStyles.closeText}>Close</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={TransactionListScreenStyles.filterSection}>
                                <Text style={TransactionListScreenStyles.filterSectionTitle}>Status</Text>
                                <FilterChips
                                    options={transactionFilters}
                                    value={localStatus}
                                    onChange={setLocalStatus}
                                />
                            </View>

                            <View style={TransactionListScreenStyles.filterSection}>
                                <Text style={TransactionListScreenStyles.filterSectionTitle}>Transaction Type</Text>
                                <FilterChips
                                    options={[
                                        {label: 'All types', value: undefined},
                                        {label: 'Income', value: 'income'},
                                        {label: 'Expense', value: 'expense'},
                                    ]}
                                    value={localType}
                                    onChange={setLocalType}
                                />
                            </View>

                            <View style={TransactionListScreenStyles.filterSection}>
                                <Text style={TransactionListScreenStyles.filterSectionTitle}>Date Range</Text>
                                <View style={{flexDirection: 'row', gap: 12}}>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontSize: 11, fontWeight: '700', color: theme.colors.textSecondary}}>From</Text>
                                        <TouchableOpacity
                                            style={TransactionListScreenStyles.dateInput}
                                            onPress={() => setShowStartPicker(true)}
                                        >
                                            <Text style={localStartDate ? TransactionListScreenStyles.dateInputText : TransactionListScreenStyles.dateInputPlaceholder}>
                                                {localStartDate ? formatDisplayDate(localStartDate) : 'Pick Date'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontSize: 11, fontWeight: '700', color: theme.colors.textSecondary}}>To</Text>
                                        <TouchableOpacity
                                            style={TransactionListScreenStyles.dateInput}
                                            onPress={() => setShowEndPicker(true)}
                                        >
                                            <Text style={localEndDate ? TransactionListScreenStyles.dateInputText : TransactionListScreenStyles.dateInputPlaceholder}>
                                                {localEndDate ? formatDisplayDate(localEndDate) : 'Pick Date'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={TransactionListScreenStyles.filterApplyButton}
                                onPress={() => {
                                    setStatusFilter(localStatus);
                                    setTypeFilter(localType);
                                    setStartDate(localStartDate);
                                    setEndDate(localEndDate);
                                    setIsFilterModalVisible(false);
                                }}
                            >
                                <Text style={TransactionListScreenStyles.filterApplyText}>Apply Filters</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={TransactionListScreenStyles.filterResetButton}
                                onPress={() => {
                                    setStatusFilter(undefined);
                                    setTypeFilter(undefined);
                                    setStartDate(undefined);
                                    setEndDate(undefined);
                                    setLocalStatus(undefined);
                                    setLocalType(undefined);
                                    setLocalStartDate(undefined);
                                    setLocalEndDate(undefined);
                                    setIsFilterModalVisible(false);
                                }}
                            >
                                <Text style={TransactionListScreenStyles.filterResetText}>Reset All</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>

            {showStartPicker && (
                <DateTimePicker
                    value={localStartDate || new Date()}
                    mode="date"
                    onChange={(event, date) => {
                        setShowStartPicker(false);
                        if (date) setLocalStartDate(date);
                    }}
                />
            )}
            {showEndPicker && (
                <DateTimePicker
                    value={localEndDate || new Date()}
                    mode="date"
                    onChange={(event, date) => {
                        setShowEndPicker(false);
                        if (date) setLocalEndDate(date);
                    }}
                />
            )}

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
