import { StyleSheet } from "react-native";
import {theme} from "../config/theme.ts";

export const AppHeaderStyles = StyleSheet.create({
    header: {
        padding: theme.spacing.l,
        paddingTop: theme.spacing.m,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        elevation: 2,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        flexDirection: 'row', // Main header layout is row
        alignItems: 'center', // Vertically align items in the header row
        justifyContent: 'space-between', // Push title section left and right section right
    },
    appTitleContainer: { // Container for the main app title ("AuditIt") and subtitle ("by NituLabs")
        flexDirection: 'column', // Stack title and subtitle vertically
        alignItems: 'flex-start', // Align text to the left
        flex: 1,
    },
    mainAppTitle: { // Style for the main app title "AuditIt"
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
    },
    appSubtitle: { // Style for the subtitle "by NituLabs"
        fontSize: 14,
        fontWeight: 'normal',
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs, // Space between main title and subtitle
    },
    rightSection: { // Container for page title and menu buttons
        flexDirection: 'column', // Stack page title and buttons vertically
        alignItems: 'flex-end', // Align items to the right
        width: '38%',
        marginLeft: theme.spacing.m,
    },
    tenantNameStyle: {
        fontSize: 15,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },
    userRole: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    menuButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        padding: 8,
        marginLeft: theme.spacing.s, // Space between menu items
    },
    menuButtonText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
});
