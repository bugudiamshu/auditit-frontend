import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { theme } from '../config/theme';

interface SnackbarContextType {
    show: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'success' | 'error' | 'info'>('info');
    const [visible, setVisible] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;

    const show = useCallback((msg: string, t: 'success' | 'error' | 'info' = 'info') => {
        setMessage(msg);
        setType(t);
        setVisible(true);

        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.delay(3000),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => setVisible(false));
    }, [opacity]);

    const hide = useCallback(() => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => setVisible(false));
    }, [opacity]);

    return (
        <SnackbarContext.Provider value={{ show }}>
            {children}{visible && (
                <Animated.View
                    style={[
                        styles.snackbar,
                        { opacity, backgroundColor: getBgColor(type) }
                    ]}
                >
                    <Text style={styles.text}>{message}</Text>
                    <TouchableOpacity onPress={hide}>
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </SnackbarContext.Provider>
    );
};

const getBgColor = (type: string) => {
    switch (type) {
        case 'success': return theme.colors.success;
        case 'error': return theme.colors.danger;
        default: return theme.colors.primary;
    }
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) throw new Error('useSnackbar must be used within SnackbarProvider');
    return context;
};

const styles = StyleSheet.create({
    snackbar: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    text: {
        color: theme.colors.white,
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
    closeText: {
        color: theme.colors.white,
        fontSize: 18,
        marginLeft: theme.spacing.m,
    }
});
