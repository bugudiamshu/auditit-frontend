import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {theme} from '../../config/theme';

type FieldErrorTextProps = {
    message?: string;
};

const FieldErrorText = ({message}: FieldErrorTextProps) =>
    message ? <Text style={styles.text}>{message}</Text> : null;

const styles = StyleSheet.create({
    text: {
        color: '#C23A1B',
        fontSize: 12,
        fontWeight: '600',
        marginTop: theme.spacing.s,
    },
});

export default FieldErrorText;
