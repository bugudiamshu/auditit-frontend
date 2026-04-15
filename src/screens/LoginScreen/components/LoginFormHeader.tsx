import React from 'react';
import {Text, View} from 'react-native';
import {LoginScreenStyles} from '../LoginScreenStyles';
type LoginFormHeaderProps = {
    isOtpStep: boolean;
    isAdmin?: boolean;
    organizationCode?: string;
    mobile?: string;
};

const LoginFormHeader = ({
    isOtpStep,
    isAdmin,
    organizationCode,
    mobile,
}: LoginFormHeaderProps) => {
    return (
        <View style={LoginScreenStyles.header}>
            <Text style={LoginScreenStyles.title}>
                {isOtpStep ? 'Verify Identity' : isAdmin ? 'Admin Access' : 'Branch Portal'}
            </Text>
            <Text style={LoginScreenStyles.subtitle}>
                {isOtpStep
                    ? `We've sent a 4-digit code to +91 ${mobile}`
                    : isAdmin
                    ? 'Access your global society portfolio and manage high-level approvals.'
                    : `Logging into ${organizationCode} branch to manage local records.`}
            </Text>
        </View>
    );
};

export default LoginFormHeader;
