// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    name: string;
    mobile: string;
    role: string; // e.g., 'founder', 'incharge'
    // Add other user properties as needed
}

interface Tenant {
    id: number;
    name: string;
    org_code: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    tenant: Tenant | null;
    isAuthenticated: boolean;
    organizationCode: string | null; // Add organizationCode here
}

const initialState: AuthState = {
    token: null,
    user: null,
    tenant: null,
    isAuthenticated: false,
    organizationCode: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<{ token: string; user: User; organizationCode?: string, tenant: Tenant }>) {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.tenant = action.payload.tenant;
            state.isAuthenticated = true;
            state.organizationCode = action.payload.organizationCode ?? null;
        },
        clearAuth(state) {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.organizationCode = null;
        },
    },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
