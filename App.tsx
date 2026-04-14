import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store'; // Import store and persistor
import {PersistGate} from 'redux-persist/integration/react'; // Import PersistGate
import {SnackbarProvider} from './src/context/SnackbarContext'; // Import SnackbarProvider
import {useAppSelector} from './src/store/store';
// Screens
import VerifyOrgScreen from "./src/screens/VerifyOrgScreen/VerifyOrgScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import PortfolioSelectionScreen from "./src/screens/PortfolioSelectionScreen/PortfolioSelectionScreen";
import TransactionEntryScreen from "./src/screens/TransactionEntryScreen/TransactionEntryScreen";
import TransactionDetailScreen from "./src/screens/TransactionDetailScreen/TransactionDetailScreen";
import BottomTabs from "./src/navigation/BottomTabs/BottomTabs.tsx";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const {isAuthenticated} = useAppSelector(state => state.auth);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={isAuthenticated ? 'MainApp' : 'VerifyOrg'}
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen name="VerifyOrg" component={VerifyOrgScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="PortfolioSelection" component={PortfolioSelectionScreen}/>
                <Stack.Screen name="MainApp" component={BottomTabs}/>
                <Stack.Screen name="TransactionEntry" component={TransactionEntryScreen}/>
                <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <SnackbarProvider> {/* Wrap with SnackbarProvider */}
                        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                        <AppNavigator />
                    </SnackbarProvider> {/* Close SnackbarProvider */}
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
