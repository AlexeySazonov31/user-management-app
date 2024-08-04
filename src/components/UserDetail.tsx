import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserById, deleteUser} from '../store/usersSlice';
import {RootState, AppDispatch} from '../store';
import {useFocusEffect} from '@react-navigation/native';
import UserImage from './UserImage';

const UserDetail: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const {userId} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const {user, loading, error} = useSelector((state: RootState) => state.users);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchUserById(userId));
    }, [dispatch, userId]),
  );

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to delete user');
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loading} />;

  if (error) return <Text style={styles.error}>{error}</Text>;

  if (!user) return <Text style={styles.error}>User not found</Text>;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <UserImage
            photoUrl={user.photo}
            size={120}
            customStyle={{marginVertical: 10}}
          />
          <Text style={styles.title}>
            {user.firstName} {user.lastName}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>Height: {user.height} cm</Text>
          <Text style={styles.detailText}>Weight: {user.weight} kg</Text>
          <Text style={styles.detailText}>Gender: {user.gender}</Text>
          <Text style={styles.detailText}>Address: {user.residence}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserForm', {user})}>
          <Text style={styles.buttonText}>Edit User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 8,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    textAlign: 'center',
    color: '#DC3545',
    margin: 20,
  },
  footer: {
    padding: 16,
  },
});

export default UserDetail;
