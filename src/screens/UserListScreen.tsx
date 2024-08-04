import React from 'react';
import {View, StyleSheet} from 'react-native';
import UserList from '../components/UserList';

const UserListScreen: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <UserList navigation={navigation} />
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

export default UserListScreen;
