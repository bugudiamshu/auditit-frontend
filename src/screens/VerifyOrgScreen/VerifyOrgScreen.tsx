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

    const handleFounderLogin = async () => {
        // Clear any existing org code when logging in as a founder
        await AsyncStorage.removeItem('X-Organization-Code');
        navigation.navigate('Login', { isFounder: true });
    };

    return (
        <SafeAreaView style={VerifyOrgScreenStyles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={VerifyOrgScreenStyles.inner}
            >
                <View style={VerifyOrgScreenStyles.logoContainer}>
                    <Text style={VerifyOrgScreenStyles.logoText}>AuditIt</Text>
                    <Text style={VerifyOrgScreenStyles.tagline}>by NituLabs</Text>
                </View>

                <View style={VerifyOrgScreenStyles.form}>
                    <Text style={VerifyOrgScreenStyles.label}>Enter Organization Code</Text>
                    <TextInput
                        style={VerifyOrgScreenStyles.input}
                        placeholder="e.g. BRIL or BSBC"
                        placeholderTextColor="#999"
                        autoCapitalize="characters"
                        value={orgCode}
                        onChangeText={setOrgCode}
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
                        style={VerifyOrgScreenStyles.founderLink}
                        onPress={handleFounderLogin}
                    >
                        <Text style={VerifyOrgScreenStyles.founderText}>Founder/Partner Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default VerifyOrgScreen;
