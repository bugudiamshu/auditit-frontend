export const theme = {
    colors: {
        // Core Palette
        primary: '#0F172A',      // Modern Navy (Changed to match new design)
        secondary: '#0EA5E9',    // Sky Blue
        success: '#10B981',      // Emerald Green
        danger: '#EF4444',       // Rose Red
        warning: '#F59E0B',      // Amber

        // Modern Slate Palette
        slate50: '#F8FAFC',
        slate100: '#F1F5F9',
        slate200: '#E2E8F0',
        slate300: '#CBD5E1',
        slate400: '#94A3B8',
        slate500: '#64748B',
        slate600: '#475569',
        slate700: '#334155',
        slate800: '#1E293B',
        slate900: '#0F172A',

        // Brand Accents
        sky50: '#F0F9FF',
        sky100: '#E0F2FE',
        sky200: '#BAE6FD',
        sky600: '#0284C7',

        // Semantic Accents
        rose50: '#FFF1F2',
        rose200: '#FECDD3',
        rose800: '#991B1B',
        green50: '#DCFCE7',
        green800: '#166534',
        amber50: '#FEF3C7',
        amber800: '#92400E',
        
        // Semantic
        background: '#F1F5F9',   // Screen background (Slate 100)
        surface: '#FFFFFF',      // Cards background
        textPrimary: '#0F172A',  // Main text (Navy)
        textSecondary: '#64748B',// Subtitles (Slate 500)
        textMuted: '#94A3B8',    // Muted text (Slate 400)
        border: '#F1F5F9',       // Clean borders
        placeholder: '#94A3B8',

        // Special
        white: '#FFFFFF',
        black: '#000000',
        overlay: 'rgba(15, 23, 42, 0.4)', // Navy with opacity
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
        s: 8,
        m: 12,
        l: 16,
        xl: 20,
        xxl: 24,
        round: 999,
    },

    typography: {
        h1: { fontSize: 42, fontWeight: '900' as const },
        h2: { fontSize: 28, fontWeight: '700' as const },
        body: { fontSize: 16, fontWeight: '400' as const },
        label: { fontSize: 14, fontWeight: '600' as const },
    }
};
