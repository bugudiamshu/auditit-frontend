import React from 'react';
import {KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {useLoginFlow} from '../../hooks/useLoginFlow';
import LoginFormHeader from './components/LoginFormHeader';
import {LoginScreenStyles} from './LoginScreenStyles';

const LoginScreen = ({navigation}: any) => {
    const route = useRoute<any>();
    const {organizationCode, isAdmin} = route.params || {};
    const {
        mobile,
        setMobile,
        otp,
        setOtp,
        isOtpStep,
        timer,
        isSendingOtp,
        isVerifyingOtp,
        handleSendOtp,
        handleVerifyOtp,
        handleResendOtp,
        resetOtpStep,
    } = useLoginFlow({navigation, organizationCode, isAdmin});

    return (
        <SafeAreaView style={LoginScreenStyles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={LoginScreenStyles.inner}
            >
                <LoginFormHeader
                    isOtpStep={isOtpStep}
                    isAdmin={isAdmin}
                    organizationCode={organizationCode}
                    mobile={mobile}
                />

                <View style={LoginScreenStyles.form}>
                    {!isOtpStep ? (
                        <>
                            <Text style={LoginScreenStyles.label}>Mobile Number</Text>
                            <TextInput
                                style={LoginScreenStyles.input}
                                placeholder="9848012345"
                                keyboardType="phone-pad"
                                maxLength={10}
                                value={mobile}
                                onChangeText={setMobile}
                                autoComplete="tel"
                            />

                            <TouchableOpacity
                                style={LoginScreenStyles.button}
                                onPress={handleSendOtp}
                                disabled={isSendingOtp || mobile.length < 10}
                            >
                                <Text style={LoginScreenStyles.buttonText}>
                                    {isSendingOtp ? 'Sending...' : 'Get OTP'}
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style={LoginScreenStyles.otpInfo}>
                                <Text style={LoginScreenStyles.otpInfoText}>
                                    An OTP has been sent to your mobile. Please check your SMS.
                                </Text>
                            </View>

                            <Text style={LoginScreenStyles.label}>Enter 4-Digit OTP</Text>
                            <TextInput
                                style={LoginScreenStyles.input}
                                placeholder="0 0 0 0"
                                keyboardType="number-pad"
                                maxLength={4}
                                autoFocus
                                value={otp}
                                onChangeText={setOtp}
                            />

                            <TouchableOpacity
                                style={LoginScreenStyles.button}
                                onPress={handleVerifyOtp}
                                disabled={isVerifyingOtp || otp.length !== 4}
                            >
                                <Text style={LoginScreenStyles.buttonText}>
                                    {isVerifyingOtp ? 'Verifying...' : 'Verify & Login'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={LoginScreenStyles.resendLink}
                                onPress={handleResendOtp}
                                disabled={timer > 0}
                            >
                                <Text
                                    style={
                                        timer > 0
                                            ? LoginScreenStyles.disabledResendText
                                            : LoginScreenStyles.resendText
                                    }
                                >
                                    {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={LoginScreenStyles.backLink} onPress={resetOtpStep}>
                                <Text style={LoginScreenStyles.backText}>← Change Mobile Number</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {!isOtpStep ? (
                        <TouchableOpacity
                            style={LoginScreenStyles.backLink}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={LoginScreenStyles.backText}>← Back</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;
