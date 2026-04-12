import {StyleSheet} from "react-native";
import {theme} from "../config/theme.ts";

export const AppFooterStyles = StyleSheet.create({
    container: {
        position: 'absolute',   // ✅ FIX
        bottom: 0,              // ✅ Stick to bottom
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        height: 60,
        elevation: 8,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        fontWeight: '600',
    },
    active: {
        color: theme.colors.primary,
    },
});
