import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppHeaderStyles } from "./AppHeaderStyles.ts";
import { theme } from "../config/theme.ts";
import {useAppSelector} from "../store/store.ts"; // Import styles for the header

interface AppHeaderProps {
    navigation: any;
    pageTitle: string; // New prop for the page title
    tenantName?: string; // Add tenantName prop
}

const AppHeader: React.FC<AppHeaderProps> = ({
    navigation,
    pageTitle, // Destructure pageTitle
    tenantName, // Destructure tenantName
}) => {

    const {tenant} = useAppSelector(state => state.auth);

    return (
        <View style={AppHeaderStyles.header}>
            {/* Container for the main app title and subtitle */}
            <View style={AppHeaderStyles.appTitleContainer}>
                <Text style={AppHeaderStyles.mainAppTitle}>AuditIt</Text> {/* Main App Title */}
                <Text style={AppHeaderStyles.appSubtitle}>by NituLabs</Text> {/* Subtitle */}
            </View>

            {/* Container for page title and menu buttons */}
            <View style={AppHeaderStyles.rightSection}>
                {/* Display Tenant Name if provided */}
                {tenant && (
                    <Text style={AppHeaderStyles.tenantNameStyle}>{tenant.name}</Text>
                )}
            </View>
        </View>
    );
};

export default AppHeader;
