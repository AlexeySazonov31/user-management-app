import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import UserListScreen from '../screens/UserListScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import UserFormScreen from '../screens/UserFormScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{title: 'User List'}}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={{title: 'User Details'}}
        />
        <Stack.Screen
          name="UserForm"
          component={UserFormScreen}
          options={{title: 'User Form'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
