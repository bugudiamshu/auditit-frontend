import {StyleSheet} from "react-native";
import {theme} from "../config/theme.ts";

export const AppFooterStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        height: 70,
        paddingBottom: 12,
        paddingTop: 12,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 22,
        marginBottom: -4,
    },
    label: {
        fontSize: 11,
        color: theme.colors.textSecondary,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    activeLabel: {
        color: theme.colors.primary,
    },
    inactiveOpacity: {
        opacity: 0.7,
    },
});
