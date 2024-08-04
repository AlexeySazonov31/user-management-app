import React from 'react';
import {View, StyleSheet} from 'react-native';
import UserDetail from '../components/UserDetail';

const UserDetailScreen: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <UserDetail route={route} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserDetailScreen;
