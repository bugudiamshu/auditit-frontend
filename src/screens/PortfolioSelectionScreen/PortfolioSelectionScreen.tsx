import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PortfolioStyles } from "./PortfolioStyles";
import { ApiService } from "../../services/ApiService";

const PortfolioSelectionScreen = ({ navigation }: any) => {
    const [societies, setSocieties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPortfolio();
    }, []);

    const loadPortfolio = async () => {
        setLoading(true);
        try {
            // In a real app, we might pass a user ID here
            const result: any = await ApiService.getPortfolio();
            setSocieties(result.portfolio);
        } catch (error) {
            console.error("Failed to load portfolio", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={[PortfolioStyles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="#0052CC" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={PortfolioStyles.container}>
            <View style={PortfolioStyles.header}>
                <Text style={PortfolioStyles.title}>Select Organization</Text>
                <Text style={PortfolioStyles.subtitle}>Welcome back, Founder</Text>
            </View>

            <FlatList
                data={societies}
                keyExtractor={(item) => item.id}
                contentContainerStyle={PortfolioStyles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={PortfolioStyles.card}
                        onPress={() => navigation.navigate('Dashboard', { society: item })}
                    >
                        <View>
                            <Text style={PortfolioStyles.cardTitle}>{item.name}</Text>
                            <Text style={PortfolioStyles.cardSub}>{item.branches} Institutions</Text>
                        </View>
                        <Text style={PortfolioStyles.arrow}>→</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                style={PortfolioStyles.globalButton}
                onPress={() => navigation.navigate('Dashboard', { isConsolidated: true })}
            >
                <Text style={PortfolioStyles.globalButtonText}>View Consolidated Dashboard</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PortfolioSelectionScreen;
