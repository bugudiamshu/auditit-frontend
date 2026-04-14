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
                            {
                                backgroundColor: isActive ? theme.colors.primary : '#F4F7FF',
                                borderColor: isActive ? theme.colors.primary : 'transparent',
                            },
                        ]}
                        onPress={() => onChange(option.value)}
                    >
                        <Text style={[styles.label, {color: isActive ? theme.colors.white : theme.colors.textSecondary}]}>
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
        gap: theme.spacing.s,
    },
    chip: {
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
    },
});

export default FilterChips;
