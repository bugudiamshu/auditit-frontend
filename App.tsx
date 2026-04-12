import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store'; // Import store and persistor
import {PersistGate} from 'redux-persist/integration/react'; // Import PersistGate
import {SnackbarProvider} from './src/context/SnackbarContext'; // Import SnackbarProvider
// Screens
import VerifyOrgScreen from "./src/screens/VerifyOrgScreen/VerifyOrgScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import PortfolioSelectionScreen from "./src/screens/PortfolioSelectionScreen/PortfolioSelectionScreen";
import TransactionEntryScreen from "./src/screens/TransactionEntryScreen/TransactionEntryScreen";
import BottomTabs from "./src/navigation/BottomTabs/BottomTabs.tsx";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <SnackbarProvider> {/* Wrap with SnackbarProvider */}
                        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                        <NavigationContainer>
                            <Stack.Navigator screenOptions={{ headerShown: false }}>
                                <Stack.Screen name="VerifyOrg" component={VerifyOrgScreen}/>
                                <Stack.Screen name="Login" component={LoginScreen}/>
                                <Stack.Screen name="PortfolioSelection" component={PortfolioSelectionScreen}/>

                                {/* Main App */}
                                <Stack.Screen name="MainApp" component={BottomTabs}/>

                                {/* Transaction Screens */}
                                <Stack.Screen name="TransactionEntry" component={TransactionEntryScreen}/>
                            </Stack.Navigator>
                        </NavigationContainer>
                    </SnackbarProvider> {/* Close SnackbarProvider */}
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
