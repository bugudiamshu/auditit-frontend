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
            {isOtpStep ? 'Verify Identity' : isFounder ? 'Founder Access' : 'Branch Portal'}
        </Text>
        <Text style={LoginScreenStyles.subtitle}>
            {isOtpStep
                ? `Please enter the 4-digit security code sent to +91 ${mobile}`
                : isFounder
                  ? 'Access your global society portfolio and manage high-level approvals.'
                  : `Securely access the ${organizationCode || 'Branch'} dashboard and manage daily ledgers.`}
        </Text>
    </View>
);

export default LoginFormHeader;
