import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PortfolioStyles } from "./PortfolioStyles";
import { useGetPortfolioQuery } from "../../store/portfolioApi";

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
                                {item.total_transactions} transactions • {item.pending_transactions} pending
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
