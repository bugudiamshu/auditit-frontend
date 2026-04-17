import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { AppFooterStyles } from "./AppFooterStyles";

interface AppFooterProps {
    navigation: any;
    activeTab?: 'dashboard' | 'transactions' | 'none';
}

const AppFooter: React.FC<AppFooterProps> = ({ navigation, activeTab = 'none' }) => {
    return (
        <View style={AppFooterStyles.container}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={AppFooterStyles.tab}
                onPress={() => navigation.navigate('MainApp', { screen: 'DashboardTab' })}
            >
                <Text style={[
                    AppFooterStyles.icon,
                    activeTab !== 'dashboard' && AppFooterStyles.inactiveOpacity
                ]}>
                    📊
                </Text>
                <Text style={[
                    AppFooterStyles.label,
                    activeTab === 'dashboard' && AppFooterStyles.activeLabel
                ]}>
                    Dashboard
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.7}
                style={AppFooterStyles.tab}
                onPress={() => navigation.navigate('MainApp', { screen: 'TransactionsTab' })}
            >
                <Text style={[
                    AppFooterStyles.icon,
                    activeTab !== 'transactions' && AppFooterStyles.inactiveOpacity
                ]}>
                    📜
                </Text>
                <Text style={[
                    AppFooterStyles.label,
                    activeTab === 'transactions' && AppFooterStyles.activeLabel
                ]}>
                    Ledger
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AppFooter;
