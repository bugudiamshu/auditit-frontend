import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';
import { PortfolioStyles } from "./PortfolioStyles";
import { useGetPortfolioQuery } from "../../store/portfolioApi";
import { formatCurrency } from '../../utils/formatters';
import { theme } from '../../config/theme';

const PortfolioSelectionScreen = ({ navigation }: any) => {
    const { data, isLoading, isFetching, refetch } = useGetPortfolioQuery();
    const societies = data?.portfolio ?? [];

    if (isLoading) {
        return (
            <SafeAreaView style={PortfolioStyles.loader} edges={['top']}>
                <AppHeader />
                <View style={PortfolioStyles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={PortfolioStyles.container} edges={['top']}>
            <AppHeader />
            
            <View style={PortfolioStyles.subHeader}>
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
                        onPress={() => navigation.navigate('OrganizationDetail', {
                            id: item.id,
                            name: item.name,
                        })}
                        activeOpacity={0.7}
                    >
                        <View style={PortfolioStyles.cardContent}>
                            <Text style={PortfolioStyles.cardTitle}>{item.name}</Text>
                            <Text style={PortfolioStyles.cardSub}>
                                Net {formatCurrency(item.net_total)} • Income {item.pending_income_count} ({formatCurrency(item.pending_income)}) • Exp {item.pending_expense_count} ({formatCurrency(item.pending_expense)})
                            </Text>
                        </View>
                        <Text style={PortfolioStyles.arrow}>→</Text>
                    </TouchableOpacity>
                )}
            />

            <AppFooter navigation={navigation} />
        </SafeAreaView>
    );
};

export default PortfolioSelectionScreen;
