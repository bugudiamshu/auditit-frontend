import React from 'react';
import {TouchableOpacity, View, Text } from 'react-native';
import { AppHeaderStyles } from "./AppHeaderStyles.ts";
import {useLogout} from "../hooks/useLogout.ts";
import {useAppSelector} from "../store/store.ts"; // Import styles for the header

interface AppHeaderProps {
    pageTitle: string; // New prop for the page title
}

const AppHeader: React.FC<AppHeaderProps> = ({
    pageTitle, // Destructure pageTitle
}) => {

    const {tenant, user} = useAppSelector(state => state.auth);
    const {confirmLogout, isLoggingOut} = useLogout();

    return (
        <View style={AppHeaderStyles.header}>
            <View style={AppHeaderStyles.appTitleContainer}>
                <Text style={AppHeaderStyles.mainAppTitle}>{pageTitle}</Text>
                <Text style={AppHeaderStyles.appSubtitle}>
                    {tenant ? tenant.name : 'AuditIt by NituLabs'}
                </Text>
            </View>

            <View style={AppHeaderStyles.rightSection}>
                <Text style={AppHeaderStyles.tenantNameStyle}>
                    {user?.name ?? 'User'}
                </Text>
                <Text style={AppHeaderStyles.userRole}>
                    {user?.role === 'founder' ? 'Founder' : 'Incharge'}
                </Text>
                <TouchableOpacity style={AppHeaderStyles.logoutButton} onPress={confirmLogout} disabled={isLoggingOut}>
                    <Text style={AppHeaderStyles.logoutText}>
                        {isLoggingOut ? 'Signing out...' : 'Logout'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AppHeader;
