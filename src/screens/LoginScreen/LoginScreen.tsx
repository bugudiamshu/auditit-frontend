import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginScreenStyles } from "./LoginScreenStyles";
import { useSendOtpMutation, useVerifyOtpMutation } from "../../store/authApi";
import { setAuth } from '../../store/authSlice'; // Import setAuth action
import { useAppDispatch } from '../../store/store'; // Import useAppDispatch
import { useSnackbar } from '../../context/SnackbarContext'; // Import useSnackbar

const RESEND_TIMER_SECONDS = 30;

const LoginScreen = ({ navigation }: any) => {
    const route = useRoute<any>();
    const { organizationCode, isFounder } = route.params || {};

    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpStep, setIsOtpStep] = useState(false);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const dispatch = useAppDispatch();
    const { show: showSnackbar } = useSnackbar(); // Get show Snackbar function

    const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
    const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();

    // Cleanup timer on unmount
    const cleanupTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => {
        return cleanupTimer;
    }, [cleanupTimer]);

    // Timer logic
    useEffect(() => {
        if (timer > 0) {
            timerRef.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            cleanupTimer();
        }
        return cleanupTimer;
    }, [timer, cleanupTimer]);

    const startTimer = useCallback(() => {
        setTimer(RESEND_TIMER_SECONDS);
    }, []);

    const handleSendOtp = useCallback(async () => {
        if (!mobile || mobile.length < 10) {
            showSnackbar('Please enter a valid mobile number', 'error');
            return;
        }

        try {
            // Pass organizationCode and isFounder if the API needs it, otherwise it might be handled by headers.
            // Assuming API handles tenant context via headers for now.
            const result = await sendOtp({ mobile, organizationCode: organizationCode || (isFounder ? 'FOUNDER' : null) }).unwrap();
            if (result.success) {
                setIsOtpStep(true);
                startTimer();
                console.log('OTP Sent successfully');
            }
        } catch (error: any) {
            console.error("Send OTP error:", error);
            showSnackbar(error?.data?.message || 'Failed to send OTP. Please check the mobile number.', 'error');
        }
    }, [mobile, organizationCode, isFounder, sendOtp, startTimer, showSnackbar]);

    const handleVerifyOtp = useCallback(async () => {
        if (!otp || otp.length !== 4) {
            showSnackbar('Please enter the 4-digit OTP', 'error');
            return;
        }

        try {
            const result = await verifyOtp({ mobile, otp }).unwrap();
            if (result.success) {
                dispatch(setAuth({
                    token: result.token,
                    user: result.user,
                    organizationCode: organizationCode // Pass organizationCode to Redux
                }));

                // Clear old AsyncStorage data if necessary, though Redux Persist handles auth slice persistence.
                await AsyncStorage.removeItem('auth_token'); // Example: Ensure old manual token is gone
                await AsyncStorage.removeItem('X-Organization-Code'); // Example: Ensure old manual orgCode is gone

                if (isFounder || result.user.role === 'founder') {
                    navigation.navigate('PortfolioSelection');
                } else {
                    navigation.navigate('Dashboard', {
                        society: { name: organizationCode || 'Branch' } // Using orgCode or a default name
                    });
                }
            }
        } catch (error: any) {
            console.error("Verify OTP error:", error);
            showSnackbar(error?.data?.message || 'Invalid OTP', 'error');
        }
    }, [mobile, otp, organizationCode, isFounder, verifyOtp, dispatch, showSnackbar, navigation]);

    const handleResendOtp = useCallback(() => {
        if (timer === 0) {
            handleSendOtp();
        }
    }, [timer, handleSendOtp]);

    return (
        <SafeAreaView style={LoginScreenStyles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={LoginScreenStyles.inner}
            >
                <View style={LoginScreenStyles.header}>
                    <Text style={LoginScreenStyles.title}>
                        {isOtpStep ? "Verify OTP" : (isFounder ? "Founder Login" : `${organizationCode || 'Branch'} Login`)}
                    </Text>
                    <Text style={LoginScreenStyles.subtitle}>
                        {isOtpStep
                            ? `Enter the 4-digit code sent to ${mobile}`
                            : (isFounder ? "Access your global portfolio" : `Access your branch dashboard`)}
                    </Text>
                </View>

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
                                autoComplete="tel" // Added autoComplete for better UX
                            />

                            <TouchableOpacity
                                style={LoginScreenStyles.button}
                                onPress={handleSendOtp}
                                disabled={isSendingOtp || mobile.length < 10} // Disable if input invalid
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
                                disabled={isVerifyingOtp || otp.length !== 4} // Disable if input invalid
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
                                <Text style={timer > 0 ? LoginScreenStyles.disabledResendText : LoginScreenStyles.resendText}>
                                    {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={LoginScreenStyles.backLink}
                                onPress={() => {
                                    cleanupTimer(); // Clear timer when going back
                                    setIsOtpStep(false);
                                    setOtp('');
                                }}
                            >
                                <Text style={LoginScreenStyles.backText}>← Change Mobile Number</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {!isOtpStep && (
                        <TouchableOpacity
                            style={LoginScreenStyles.backLink}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={LoginScreenStyles.backText}>← Back</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

