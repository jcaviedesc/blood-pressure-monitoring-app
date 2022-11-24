import * as React from 'react';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SummaryScreenTab from '../screens/Summary';
import SelfCareScreens from './SelfCareScreens';
import ClinicalMonitoringStack from './ClinicalMonitoringStack';
import { userRole } from '../store/user/types';
import { useAppSelector } from '../hooks';
import { selectUserData } from '../store/user/userSlice';
import { Colors, Fonts } from '../styles';
import { useI18nLocate } from '../providers/LocalizationProvider';
import { TabsStackParamsList } from './types';

const Tab = createBottomTabNavigator<TabsStackParamsList>();

export default function MainTabsHome() {
  const isDarkMode = useColorScheme() === 'dark';
  const { translate } = useI18nLocate();
  const user = useAppSelector(selectUserData);
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
          } else if (route.name === 'Monitoring') {
            iconName = 'users';
          }

          // You can return any component that you like here!
          return <FontAwesomeIcon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="SummaryTab"
        options={{
          headerShown: false,
          tabBarLabel: translate('Tabs.summary'),
        }}
        component={SummaryScreenTab}
      />
      <Tab.Screen
        name="Search"
        options={{
          headerShown: false,
          tabBarLabel: translate('Tabs.search'),
        }}
        component={SelfCareScreens}
      />
      {user.role === userRole.HEALTH_PROFESSIONAL && (
        <Tab.Screen
          name="Monitoring"
          options={{
            headerShown: false,
            tabBarLabel: translate('Tabs.monitoring'),
          }}
          component={ClinicalMonitoringStack}
        />
      )}
    </Tab.Navigator>
  );
}
