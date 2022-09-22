import * as React from 'react';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomIcon from 'react-native-vector-icons/FontAwesome';
import SummaryScreen from '../screens/Summary';
import SelfCareScreens from './SelfCareScreens';
import { Colors, Fonts } from '../styles';
import { useI18nLocate } from '../providers/LocalizationProvider';

const Tab = createBottomTabNavigator();

export default function MainTabsHome() {
  const isDarkMode = useColorScheme() === 'dark';
  const { translate } = useI18nLocate();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.tertiary,
        tabBarInactiveTintColor: Colors.paragraph,
        tabBarStyle: {
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.background,
        },
        tabBarLabelStyle: {
          fontFamily: Fonts.type.regular,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'question';

          if (route.name === 'SummaryTab') {
            iconName = 'child';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }

          // You can return any component that you like here!
          return <FontAwesomIcon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="SummaryTab"
        options={{
          headerShown: false,
          tabBarLabel: translate('Tabs.summary'),
        }}
        component={SummaryScreen}
      />
      <Tab.Screen
        name="Search"
        options={{
          headerShown: false,
          tabBarLabel: translate('Tabs.search'),
        }}
        component={SelfCareScreens}
      />
    </Tab.Navigator>
  );
}
