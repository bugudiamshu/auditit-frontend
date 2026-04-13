import React from 'react';
import {Text, View} from 'react-native';
import {LoginScreenStyles} from '../LoginScreenStyles';

type LoginFormHeaderProps = {
    isOtpStep: boolean;
    isFounder?: boolean;
    organizationCode?: string;
    mobile: string;
};

const LoginFormHeader = ({
    isOtpStep,
    isFounder,
    organizationCode,
    mobile,
}: LoginFormHeaderProps) => (
    <View style={LoginScreenStyles.header}>
        <Text style={LoginScreenStyles.title}>
            {isOtpStep ? 'Verify OTP' : isFounder ? 'Founder Login' : `${organizationCode || 'Branch'} Login`}
        </Text>
        <Text style={LoginScreenStyles.subtitle}>
            {isOtpStep
                ? `Enter the 4-digit code sent to ${mobile}`
                : isFounder
                  ? 'Access your global portfolio'
                  : 'Access your branch dashboard'}
        </Text>
    </View>
);

export default LoginFormHeader;
