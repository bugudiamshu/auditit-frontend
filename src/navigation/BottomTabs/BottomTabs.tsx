import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import {theme} from "../../config/theme.ts";
import DashboardScreen from "../../screens/DashboardScreen/DashboardScreen.tsx";
import TransactionListScreen from "../../screens/TransactionListScreen/TransactionListScreen.tsx";

const Tab = createBottomTabNavigator();
const DashboardIcon = ({ focused }: { focused: boolean }) => (
    <Text style={{ 
        fontSize: 22, 
        opacity: focused ? 1 : 0.5,
        marginBottom: -4 
    }}>📊</Text>
);
const TransactionsIcon = ({ focused }: { focused: boolean }) => (
    <Text style={{ 
        fontSize: 22, 
        opacity: focused ? 1 : 0.5,
        marginBottom: -4 
    }}>📜</Text>
);

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    backgroundColor: theme.colors.surface,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.border,
                    paddingBottom: 12,
                    paddingTop: 12,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '800',
                    marginTop: 4,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                },
            }}
        >
            <Tab.Screen
                name="DashboardTab"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: DashboardIcon,
                }}
            />

            <Tab.Screen
                name="TransactionsTab"
                component={TransactionListScreen}
                options={{
                    tabBarLabel: 'Transactions',
                    tabBarIcon: TransactionsIcon,
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
