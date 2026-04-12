export const theme = {
    colors: {
        // Core Palette
        primary: '#0052CC',      // Modern Blue
        secondary: '#6554C0',    // Subtle Purple
        success: '#36B37E',      // For "Approved"
        danger: '#FF5630',       // For "Rejected"
        warning: '#FFAB00',      // For "Pending"

        // Neutral Grays (For Text & Borders)
        background: '#F5F7FA',   // Screen background
        surface: '#FFFFFF',      // Cards/Inputs background
        textPrimary: '#172B4D',  // Main headings
        textSecondary: '#6B778C',// Subtitles
        border: '#DFE1E6',       // Input borders
        placeholder: '#A5ADBA',

        // Special
        white: '#FFFFFF',
        black: '#000000',
        overlay: 'rgba(0, 0, 0, 0.1)',
    },

    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
        xxl: 48,
    },

    borderRadius: {
        s: 4,
        m: 8,
        l: 12,
        round: 25,
    },

    typography: {
        h1: { fontSize: 42, fontWeight: '900' as const },
        h2: { fontSize: 28, fontWeight: '700' as const },
        body: { fontSize: 16, fontWeight: '400' as const },
        label: { fontSize: 14, fontWeight: '600' as const },
    }
};
