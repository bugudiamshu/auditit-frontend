import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {useSnackbar} from '../context/SnackbarContext';
import {useLogoutMutation} from '../store/authApi';
import {clearAuth} from '../store/authSlice';
import {baseApi} from '../store/baseApi';
import {persistor, useAppDispatch} from '../store/store';

export const useLogout = () => {
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const {show: showSnackbar} = useSnackbar();
    const [logout, {isLoading}] = useLogoutMutation();

    const resetClientState = async () => {
        dispatch(clearAuth());
        dispatch(baseApi.util.resetApiState());
        await AsyncStorage.removeItem('X-Organization-Code');
        await persistor.flush();
        await persistor.purge();
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'VerifyOrg'}],
            }),
        );
    };

    const performLogout = async () => {
        try {
            const logoutPromise = logout().unwrap();
            await resetClientState();
            await logoutPromise;
            showSnackbar('Logged out successfully.', 'success');
        } catch (error: any) {
            await resetClientState();
            showSnackbar(error?.data?.message || 'Signed out on this device.', 'info');
        }
    };

    const confirmLogout = () => {
        if (isLoading) {
            return;
        }

        Alert.alert('Log out', 'Do you want to log out of AuditIt on this device?', [
            {text: 'Cancel', style: 'cancel'},
            {
                text: 'Log out',
                style: 'destructive',
                onPress: () => {
                    performLogout().catch(() => null);
                },
            },
        ]);
    };

    return {
        confirmLogout,
        isLoggingOut: isLoading,
    };
};
