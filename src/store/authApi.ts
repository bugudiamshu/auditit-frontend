import { baseApi } from './baseApi';

/**
 * Auth API for handling User login and OTP operations.
 * This injects endpoints into our centralized baseApi.
 */
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendOtp: builder.mutation({
            query: (data: { mobile: string }) => ({
                url: '/send-otp',
                method: 'POST',
                body: data,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (data: { mobile: string; otp: string }) => ({
                url: '/verify-otp',
                method: 'POST',
                body: data,
            }),
            // Force a refetch of the dashboard after any successful login/switch
            invalidatesTags: ['Dashboard'],
        }),
    }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = authApi;
