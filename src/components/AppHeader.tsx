import React from 'react';
import {TouchableOpacity, View, Text } from 'react-native';
import { AppHeaderStyles } from "./AppHeaderStyles.ts";
import {useLogout} from "../hooks/useLogout.ts";
import {useAppSelector} from "../store/store.ts"; // Import styles for the header

interface AppHeaderProps {
    pageTitle: string; // New prop for the page title
}

const AppHeader: React.FC<AppHeaderProps> = ({
    pageTitle,
}) => {
    const {tenant, user} = useAppSelector(state => state.auth);
    const {confirmLogout, isLoggingOut} = useLogout();
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

    return (
        <View style={AppHeaderStyles.header}>
            <View style={AppHeaderStyles.leftContent}>
                <Text style={AppHeaderStyles.pageTitle}>{pageTitle}</Text>
                <Text style={AppHeaderStyles.tenantName} numberOfLines={1}>
                    {tenant ? tenant.name : 'AuditIt Central'}
                </Text>
            </View>

            <View style={AppHeaderStyles.rightContent}>
                <View style={AppHeaderStyles.userInfo}>
                    <Text style={AppHeaderStyles.userName}>{user?.name?.split(' ')[0] ?? 'User'}</Text>
                    <View style={AppHeaderStyles.roleBadge}>
                        <Text style={AppHeaderStyles.roleText}>
                            {user?.role === 'admin' ? 'Admin' : 'Incharge'}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity 
                    style={AppHeaderStyles.avatarContainer} 
                    onPress={confirmLogout}
                    disabled={isLoggingOut}
                >
                    <View style={AppHeaderStyles.avatar}>
                        <Text style={AppHeaderStyles.avatarText}>{userInitial}</Text>
                    </View>
                    <View style={AppHeaderStyles.logoutIndicator} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AppHeader;
