import { StyleSheet } from "react-native";
import {theme} from "../config/theme.ts";

export const AppHeaderStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.slate100,
        elevation: 2,
        shadowColor: theme.colors.slate900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    leftContent: {
        flex: 1,
    },
    tenantNameLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: theme.colors.slate400,
        letterSpacing: 1.2,
        marginBottom: 2,
    },
    tenantName: {
        fontSize: 17,
        fontWeight: '900',
        color: theme.colors.slate900,
        letterSpacing: -0.5,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfo: {
        alignItems: 'flex-end',
        marginRight: 14,
    },
    userName: {
        fontSize: 15,
        fontWeight: '800',
        color: theme.colors.slate900,
    },
    roleBadge: {
        backgroundColor: theme.colors.slate50,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        marginTop: 4,
    },
    roleText: {
        fontSize: 10,
        fontWeight: '800',
        color: theme.colors.slate600,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    avatarText: {
        color: theme.colors.white,
        fontSize: 18,
        fontWeight: '900',
    },
    logoutIndicator: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: theme.colors.danger,
        borderWidth: 2,
        borderColor: theme.colors.white,
    }
});
