import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearAuth } from '../store/authSlice';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import clearAuth action

const BASE_URL = 'http://192.168.0.210:8888/nitulabs/auditit/api/public/api';

export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');

        // Retrieve token and org code from Redux store state
        const state = getState() as any;
        const token = state.auth.token;
        const orgCode = await AsyncStorage.getItem('X-Organization-Code');
        if (orgCode) {
            headers.set('X-Organization-Code', orgCode);
        }
        console.log('token', token);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        } else {
            console.warn('No auth token found in Redux state. Request might be unauthenticated.');
            // Optionally, dispatch clearAuth here if token is missing, to reset state
            // store.dispatch(clearAuth()); // This might cause infinite loops if not careful.
        }

        return headers;
    },
});

// Custom error handler to dispatch logout on 401
export const apiBaseQuery = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // Handle unauthorized access - e.g., clear auth state and redirect to login
        api.dispatch(clearAuth());
        // You might want to navigate to the login screen here, but it requires access to navigation context
        // For now, just log it.
        console.error('Unauthorized access - 401 received. Token might be invalid or expired.');
    }
    return result;
};
