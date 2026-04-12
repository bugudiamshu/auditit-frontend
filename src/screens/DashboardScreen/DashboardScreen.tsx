import React, { useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    FlatList,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from "../../config/theme.ts";
import { DashboardStyles } from "./DashboardStyles.ts";
import { useGetDashboardSummaryQuery } from "../../store/dashboardApi";

const DashboardScreen = ({ navigation }: any) => {
    const { data, isLoading, refetch, isFetching } = useGetDashboardSummaryQuery();

    // Re-fetch data every time the screen comes into focus
    // This is crucial for reflecting context switches (e.g., Founder -> Society)
    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    if (isLoading) {
        return (
            <View style={[DashboardStyles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={{ marginTop: 10, color: theme.colors.textSecondary, textAlign: 'center' }}>
                    Loading Dashboard...
                </Text>
            </View>
        );
    }

    const summary = data?.summary;
    const metrics = data?.metrics;
    const isFounder = data?.role === 'founder';

    return (
        <SafeAreaView style={DashboardStyles.container}>
            <View style={DashboardStyles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={DashboardStyles.welcomeText}>
                            {isFounder ? "Global Portfolio" : "Branch Overview"}
                        </Text>
                        <Text style={DashboardStyles.orgName}>
                            {isFounder ? "Welcome, Founder" : "Branch Dashboard"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TransactionList')} // Navigate to Transaction List
                            style={{ padding: 8, marginRight: 15 }}
                        >
                            <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Transactions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('VerifyOrg')}
                            style={{ padding: 8 }}
                        >
                            <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Switch</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>

                <ScrollView
                refreshControl={
                    <RefreshControl refreshing={isFetching} onRefresh={refetch} tintColor={theme.colors.primary} />
                }
                >
                {isFounder ? (
                    // FOUNDER VIEW
                    <>
                        <View style={DashboardStyles.summaryContainer}>
                            <View style={DashboardStyles.card}>
                                <Text style={DashboardStyles.cardLabel}>TOTAL SOCIETIES</Text>
                                <Text style={DashboardStyles.cardValue}>{summary?.total_societies}</Text>
                            </View>
                            <View style={DashboardStyles.card}>
                                <Text style={DashboardStyles.cardLabel}>TOTAL REVENUE</Text>
                                <Text style={[DashboardStyles.cardValue, DashboardStyles.income]}>
                                    {summary?.total_revenue}
                                </Text>
                            </View>
                        </View>

                        <Text style={DashboardStyles.sectionTitle}>Your Societies</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={summary?.societies}
                            keyExtractor={(item) => item.org_code}
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[DashboardStyles.metricCard, { borderTopWidth: 4, borderTopColor: item.primary_color || theme.colors.primary }]}
                                    onPress={() => navigation.navigate('Login', { organizationCode: item.org_code })}
                                >
                                    <Text style={DashboardStyles.cardLabel}>{item.org_code}</Text>
                                    <Text style={[DashboardStyles.cardValue, { fontSize: 16 }]} numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    <View style={DashboardStyles.badge}>
                                        <Text style={DashboardStyles.badgeText}>ACTIVE</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </>
                ) : (
                    // TENANT / INCHARGE VIEW
                    <>
                        <View style={DashboardStyles.summaryContainer}>
                            <View style={DashboardStyles.card}>
                                <Text style={DashboardStyles.cardLabel}>STUDENTS</Text>
                                <Text style={DashboardStyles.cardValue}>{metrics?.total_students}</Text>
                            </View>
                            <View style={DashboardStyles.card}>
                                <Text style={DashboardStyles.cardLabel}>COLLECTION</Text>
                                <Text style={[DashboardStyles.cardValue, DashboardStyles.income]}>
                                    {metrics?.fee_collected}
                                </Text>
                            </View>
                        </View>

                        <View style={DashboardStyles.summaryContainer}>
                            <View style={DashboardStyles.card}>
                                <Text style={DashboardStyles.cardLabel}>PENDING DUES</Text>
                                <Text style={[DashboardStyles.cardValue, DashboardStyles.expense]}>
                                    {metrics?.pending_dues}
                                </Text>
                            </View>
                            <View style={DashboardStyles.card}>
                                <Text style={DashboardStyles.cardLabel}>AUDIT SCORE</Text>
                                <Text style={[DashboardStyles.cardValue, { color: theme.colors.warning }]}>
                                    {metrics?.audit_status}
                                </Text>
                            </View>
                        </View>

                        <Text style={DashboardStyles.sectionTitle}>Recent Activity</Text>
                        {metrics?.recent_activity.map((item: any) => (
                            <View key={item.id} style={DashboardStyles.activityItem}>
                                <View style={DashboardStyles.activityIcon}>
                                    <Text style={{ fontSize: 18 }}>{item.type === 'Fee' ? '💰' : '📝'}</Text>
                                </View>
                                <View style={DashboardStyles.activityContent}>
                                    <Text style={DashboardStyles.activityTitle}>{item.title}</Text>
                                    <Text style={DashboardStyles.activityTime}>{item.time}</Text>
                                </View>
                                {item.amount && (
                                    <Text style={DashboardStyles.activityAmount}>{item.amount}</Text>
                                )}
                            </View>
                        ))}
                    </>
                )}
                </ScrollView>

                {/* Float Action Button for Incharges to add entries */}
                {!isFounder && (
                <TouchableOpacity
                    style={DashboardStyles.fab}
                    onPress={() => navigation.navigate('TransactionEntry')}
                >
                    <Text style={DashboardStyles.fabText}>+</Text>
                </TouchableOpacity>
                )}
                </SafeAreaView>
                );
                };

                export default DashboardScreen;

