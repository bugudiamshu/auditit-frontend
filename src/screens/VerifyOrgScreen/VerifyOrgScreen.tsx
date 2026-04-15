// src/screens/VerifyOrgScreen/VerifyOrgScreen.tsx
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VerifyOrgScreenStyles } from "./VerifyOrgScreenStyles";
import { useVerifyOrganizationMutation } from "../../store/slices/orgSlice";

const VerifyOrgScreen = ({ navigation }: any) => {
    const [orgCode, setOrgCode] = useState('');

    // RTK Query hook provides the trigger function and the status object
    const [verifyOrganization, { isLoading }] = useVerifyOrganizationMutation();

    const handleVerify = async () => {
        if (!orgCode.trim()) {
            Alert.alert('Error', 'Please enter an Organization Code');
            return;
        }

        try {
            const formattedCode = orgCode.trim().toUpperCase();
            // .unwrap() unwraps the RTK Query payload so we can use standard try/catch logic
            const response = await verifyOrganization({ code: formattedCode }).unwrap();
            if (response.success) {
                // Store the organization code for future API requests
                await AsyncStorage.setItem('X-Organization-Code', formattedCode);

                navigation.navigate('Login', {
                    organizationCode: formattedCode,
                    branding: response.branding
                });
            }
        } catch (error: any) {
            // RTK Query error objects look slightly different than Axios
            if (error.status === 404) {
                Alert.alert('Invalid Code', 'Organization not found.');
            } else if (error.status === 422 && error.data?.errors) {
                // 422 is Laravel's default validation error status
                Alert.alert('Validation Error', error.data.message);
            } else {
                console.error(error);
                Alert.alert('Network Error', 'Could not connect to the server.');
            }
        }
    };

    const handleAdminLogin = async () => {
        // Clear any existing org code when logging in as an admin
        await AsyncStorage.removeItem('X-Organization-Code');
        navigation.navigate('Login', { isAdmin: true });
    };

    return (
        <SafeAreaView style={VerifyOrgScreenStyles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={VerifyOrgScreenStyles.inner}
            >
                <View style={VerifyOrgScreenStyles.logoContainer}>
                    <Text style={VerifyOrgScreenStyles.logoText}>AuditIt</Text>
                    <Text style={VerifyOrgScreenStyles.tagline}>Financial Trust Layer</Text>
                </View>

                <View style={VerifyOrgScreenStyles.form}>
                    <Text style={VerifyOrgScreenStyles.headerText}>Let's get started</Text>
                    <Text style={VerifyOrgScreenStyles.subHeaderText}>
                        Enter your unique organization code provided by your society admin.
                    </Text>

                    <Text style={VerifyOrgScreenStyles.label}>Organization Code</Text>
                    <TextInput
                        style={VerifyOrgScreenStyles.input}
                        placeholder="BRIL"
                        placeholderTextColor="#B0B0B0"
                        autoCapitalize="characters"
                        value={orgCode}
                        onChangeText={setOrgCode}
                        maxLength={8}
                    />

                    <TouchableOpacity
                        style={VerifyOrgScreenStyles.button}
                        onPress={handleVerify}
                        disabled={isLoading}
                    >
                        <Text style={VerifyOrgScreenStyles.buttonText}>
                            {isLoading ? 'Verifying...' : 'Continue'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={VerifyOrgScreenStyles.adminLink}
                        onPress={handleAdminLogin}
                    >
                        <Text style={VerifyOrgScreenStyles.adminText}>Login as Admin/Partner Instead →</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default VerifyOrgScreen;
