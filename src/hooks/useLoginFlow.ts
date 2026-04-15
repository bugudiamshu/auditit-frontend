import {useCallback, useEffect, useRef, useState} from 'react';
import {useSendOtpMutation, useVerifyOtpMutation} from '../store/authApi';
import {setAuth} from '../store/authSlice';
import {useSnackbar} from '../context/SnackbarContext';
import {useAppDispatch} from '../store/store';

const RESEND_TIMER_SECONDS = 30;

type UseLoginFlowParams = {
    navigation: any;
    organizationCode?: string;
    isAdmin?: boolean;
};

export const useLoginFlow = ({navigation, organizationCode, isAdmin}: UseLoginFlowParams) => {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpStep, setIsOtpStep] = useState(false);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const dispatch = useAppDispatch();
    const {show: showSnackbar} = useSnackbar();
    const [sendOtp, {isLoading: isSendingOtp}] = useSendOtpMutation();
    const [verifyOtp, {isLoading: isVerifyingOtp}] = useVerifyOtpMutation();

    const cleanupTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => cleanupTimer, [cleanupTimer]);

    useEffect(() => {
        if (timer > 0) {
            timerRef.current = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else {
            cleanupTimer();
        }

        return cleanupTimer;
    }, [cleanupTimer, timer]);

    const handleSendOtp = useCallback(async () => {
        if (!mobile || mobile.length < 10) {
            showSnackbar('Please enter a valid mobile number', 'error');
            return;
        }

        try {
            const result = await sendOtp({mobile, isAdmin}).unwrap();
            if (result.success) {
                setIsOtpStep(true);
                setTimer(RESEND_TIMER_SECONDS);
            }
        } catch (error: any) {
            showSnackbar(
                error?.data?.message || 'Failed to send OTP. Please check the mobile number.',
                'error',
            );
        }
    }, [mobile, sendOtp, showSnackbar]);

    const handleVerifyOtp = useCallback(async () => {
        if (!otp || otp.length !== 4) {
            showSnackbar('Please enter the 4-digit OTP', 'error');
            return;
        }

        try {
            const result = await verifyOtp({mobile, otp, isAdmin}).unwrap();
            if (result.success) {
                dispatch(
                    setAuth({
                        token: result.token,
                        user: result.user,
                        tenant: result.tenant ?? null,
                        organizationCode,
                    }),
                );

                navigation.replace('MainApp');
            }
        } catch (error: any) {
            showSnackbar(error?.data?.message || 'Invalid OTP', 'error');
        }
    }, [dispatch, mobile, navigation, organizationCode, otp, showSnackbar, verifyOtp]);

    const handleResendOtp = useCallback(() => {
        if (timer === 0) {
            handleSendOtp().catch(() => null);
        }
    }, [handleSendOtp, timer]);

    const resetOtpStep = useCallback(() => {
        cleanupTimer();
        setIsOtpStep(false);
        setOtp('');
    }, [cleanupTimer]);

    return {
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
    };
};
