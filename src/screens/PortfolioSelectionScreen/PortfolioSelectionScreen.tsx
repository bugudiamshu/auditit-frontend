import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PortfolioStyles } from "./PortfolioStyles";
import { useGetPortfolioQuery } from "../../store/portfolioApi";
import { formatCurrency } from '../../utils/formatters';

const PortfolioSelectionScreen = ({ navigation }: any) => {
    const { data, isLoading, isFetching, refetch } = useGetPortfolioQuery();
    const societies = data?.portfolio ?? [];

    if (isLoading) {
        return (
            <SafeAreaView style={[PortfolioStyles.container, PortfolioStyles.loadingContainer]}>
                <ActivityIndicator size="large" color="#0052CC" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={PortfolioStyles.container}>
            <View style={PortfolioStyles.header}>
                <Text style={PortfolioStyles.title}>Select Organization</Text>
                <Text style={PortfolioStyles.subtitle}>Portfolio overview is now available from your dashboard.</Text>
            </View>

            <FlatList
                data={societies}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={PortfolioStyles.list}
                onRefresh={refetch}
                refreshing={isFetching}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={PortfolioStyles.card}
                        onPress={() => navigation.replace('MainApp')}
                    >
                        <View>
                            <Text style={PortfolioStyles.cardTitle}>{item.name}</Text>
                            <Text style={PortfolioStyles.cardSub}>
                                Net {formatCurrency(item.net_total)} • Income {item.pending_income_count} ({formatCurrency(item.pending_income)}) • Exp {item.pending_expense_count} ({formatCurrency(item.pending_expense)})
                            </Text>
                        </View>
                        <Text style={PortfolioStyles.arrow}>→</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                style={PortfolioStyles.globalButton}
                onPress={() => navigation.replace('MainApp')}
            >
                <Text style={PortfolioStyles.globalButtonText}>Open Consolidated Dashboard</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PortfolioSelectionScreen;
