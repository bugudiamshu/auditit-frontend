import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import {theme} from "../../config/theme";

const DashboardScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <AppHeader navigation={navigation}  pageTitle={'Dashboard'}/>

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 60 // ✅ prevent overlap
            }}>
                <Text style={{
                    color: theme.colors.textSecondary,
                    fontSize: 16
                }}>
                    Dashboard coming soon...
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default DashboardScreen;
