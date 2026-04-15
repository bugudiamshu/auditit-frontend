import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../../config/theme';

type FilterOption<T> = {
    label: string;
    value: T;
};

type FilterChipsProps<T> = {
    options: Array<FilterOption<T>>;
    value: T;
    onChange: (value: T) => void;
    style?: object;
};

function FilterChips<T>({options, value, onChange, style}: FilterChipsProps<T>) {
    return (
        <View style={[styles.row, style]}>
            {options.map(option => {
                const isActive = option.value === value;

                return (
                    <TouchableOpacity
                        key={option.label}
                        style={[
                            styles.chip,
                            isActive && styles.chipActive
                        ]}
                        onPress={() => onChange(option.value)}
                    >
                        <Text style={[
                            styles.label,
                            isActive && styles.labelActive
                        ]}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: theme.colors.slate50,
        borderWidth: 1,
        borderColor: theme.colors.slate100,
    },
    chipActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: theme.colors.textSecondary,
    },
    labelActive: {
        color: theme.colors.white,
    },
});

export default FilterChips;
