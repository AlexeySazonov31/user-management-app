import React from 'react';
import {View, StyleSheet} from 'react-native';
import UserForm from '../components/UserForm';

const UserFormScreen: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <UserForm route={route} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default UserFormScreen;
