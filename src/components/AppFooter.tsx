import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { AppFooterStyles } from "./AppFooterStyles";

interface AppFooterProps {
    navigation: any;
    activeTab?: 'dashboard' | 'transactions';
}

const AppFooter: React.FC<AppFooterProps> = ({ navigation, activeTab = 'dashboard' }) => {
    return (
        <View style={AppFooterStyles.container}>
            <TouchableOpacity
                style={AppFooterStyles.tab}
                onPress={() => navigation.navigate('Dashboard')}
            >
                <Text style={[
                    AppFooterStyles.label,
                    activeTab === 'dashboard' && AppFooterStyles.active
                ]}>
                    Dashboard
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={AppFooterStyles.tab}
                onPress={() => navigation.navigate('TransactionList')}
            >
                <Text style={[
                    AppFooterStyles.label,
                    activeTab === 'transactions' && AppFooterStyles.active
                ]}>
                    Transactions
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AppFooter;
