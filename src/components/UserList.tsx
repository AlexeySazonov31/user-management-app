import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {fetchUsers, setPage} from '../store/usersSlice';
import UserImage from './UserImage';

const UserList: React.FC<{navigation: any}> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {users, loading, error, page, pageSize, totalPages} = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsers({page, pageSize}));
  }, [dispatch, page, pageSize]);

  const loadMoreUsers = useCallback(() => {
    if (!loading && page < totalPages) {
      dispatch(setPage(page + 1));
    }
  }, [dispatch, loading, page, totalPages]);

  if (loading && page === 1) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id || ''}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('UserDetail', {userId: item.id})
            }>
            <View style={styles.cardContent}>
              <UserImage
                photoUrl={item.photo}
                customStyle={{marginRight: 15}}
              />
              <View style={styles.userInfo}>
                <Text style={styles.name}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text style={styles.details}>
                  Height: {item.height} cm | Weight: {item.weight} kg
                </Text>
              </View>
              <Icon name="arrow-right" size={24} color="#999" />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.1}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('UserForm')}>
        <Text style={styles.addButtonText}>Add New User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
    width: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserList;
