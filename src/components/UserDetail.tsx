import React, {useEffect, useState} from 'react';
import {View, Text, Button, ActivityIndicator, Alert} from 'react-native';
import axios from 'axios';
import {User} from '../models/User';

const UserDetail: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const {userId} = route.params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${userId}`,
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Unable to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to delete user');
    }
  };

  if (loading) return <ActivityIndicator size="large" />;

  if (!user) return <Text>User not found</Text>;

  return (
    <View>
      <Text>
        {user.firstName} {user.lastName}
      </Text>
      <Text>Height: {user.height} cm</Text>
      <Text>Weight: {user.weight} kg</Text>
      <Text>Gender: {user.gender}</Text>
      <Text>Address: {user.residence}</Text>
      <Button
        title="Edit User"
        onPress={() => navigation.navigate('UserForm', {user})}
      />
      <Button title="Delete User" onPress={handleDelete} />
    </View>
  );
};

export default UserDetail;
