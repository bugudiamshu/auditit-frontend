// src/store/slices/orgSlice.ts
import { baseApi } from '../baseApi';

/**
 * Organization Slice for verifying organization code.
 * Injects into baseApi for unified RTK Query management.
 */
export const orgSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        verifyOrganization: builder.mutation({
            query: (data: { code: string }) => ({
                url: '/verify-organization',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Dashboard'], // Invalidate dashboard data on org switch
        }),
    }),
});

// RTK Query auto-generates this hook based on the endpoint name
export const { useVerifyOrganizationMutation } = orgSlice;
