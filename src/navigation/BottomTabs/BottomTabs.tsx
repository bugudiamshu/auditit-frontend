import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import {theme} from "../../config/theme.ts";
import DashboardScreen from "../../screens/DashboardScreen/DashboardScreen.tsx";
import TransactionListScreen from "../../screens/TransactionListScreen/TransactionListScreen.tsx";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.border,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="DashboardTab"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color }) => (
                        <Text style={{ color }}>🏠</Text>
                    ),
                }}
            />

            <Tab.Screen
                name="TransactionsTab"
                component={TransactionListScreen}
                options={{
                    tabBarLabel: 'Transactions',
                    tabBarIcon: ({ color }) => (
                        <Text style={{ color }}>💰</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
