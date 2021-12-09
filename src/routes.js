import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';


import StartScreen from '../src/screens/Start';
import LogintScreen from '../src/screens/Login';
import SignUpScreen from '../src/screens/SignUp';
import ScanScreen from '../src/screens/Scan';
import HomeScreen from '../src/screens/Home';
import MenuScreen from '../src/screens/Menu';
import NotificationScreen from '../src/screens/Notification';
import SettingsScreen from '../src/screens/Settings';
import EditInfoScreen from '../src/screens/EditInfo';
import CheckScreen from '../src/screens/Check';


import MenuButton from './components/MenuButton';


const Stack = createStackNavigator();
export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ animationEnabled: false, headerShown: false }}>
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="LogintScreen" component={LogintScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="ScanScreen" component={ScanScreen} />
                <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
                <Stack.Screen name="EditInfoScreen" component={EditInfoScreen} />
                <Stack.Screen name="Navigation" component={Navigation} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

const icons = {
    Home: {
        lib: AntDesign,
        name: 'home',
    },
    Check: {
        lib: Feather,
        name: 'check-circle',
    },
    Notifications: {
        lib: Ionicons,
        //name: 'ios-notifications-outline',
        name: 'ios-megaphone-outline',
    },
    Settings: {
        lib: AntDesign,
        name: 'setting',
    },
};

const Tab = createBottomTabNavigator();
export function Navigation() {
    return (
        <Tab.Navigator

            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    if (route.name === 'Menu') {
                        return (
                            <MenuButton onPress={() => navigation.navigate('Menu')} focused={focused} />
                        );
                    }

                    const { lib: Icon, name } = icons[route.name];
                    return <Icon name={name} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                style: {
                    backgroundColor: '#131418',
                    borderTopColor: 'rgba(255, 255, 255, 0.2)',
                },
                activeTintColor: '#fff',
                inactiveTintColor: '#92929c',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Início',
                }}
            />
            <Tab.Screen
                name="Check"
                component={CheckScreen}
                options={{
                    title: 'Check Out',
                }}
            />
            <Tab.Screen
                name="Menu"
                component={MenuScreen}
                options={{
                    title: '',
                }}
            />

            <Tab.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                    title: 'Ajuda',
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Configurações',
                }}
            />
        </Tab.Navigator>
    );
}



// const Switch = createSwitchNavigator();

// export default function Routes() {
//     return (
//         <NavigationContainer>
//             <Switch.Navigator>
//                 <Switch.Screen StartScreen key />
//                 <Switch.Screen StartScreen />
//                 <Switch.Screen StartScreen />
//                 <Switch.Screen StartScreen />
//                 <Switch.Screen StartScreen />
//             </Switch.Navigator>
//         </NavigationContainer>
//     );
// }



// const Routes = createAppContainer(
//     createSwitchNavigator({
//         StartScreen,
//         LogintScreen,
//         SignUpScreen,
//         ScanScreen,
//     })
// );
// export default Routes;