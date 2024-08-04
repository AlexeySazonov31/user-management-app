import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import axios from 'axios';
import {NewOrUpdateUser} from '../models/User';

const UserForm: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const {user} = route.params || {};
  const [form, setForm] = useState<NewOrUpdateUser>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    height: user?.height || 0,
    weight: user?.weight || 0,
    gender: user?.gender || '',
    residence: user?.residence || '',
    photo: user?.photo || '',
  });

  const handleChange = (
    name: keyof NewOrUpdateUser,
    value: string | number,
  ) => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = async () => {
    try {
      if (user?.id) {
        await axios.put(`http://localhost:8080/users/${user.id}`, form);
      } else {
        await axios.post('http://localhost:8080/users', form);
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to save user');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="First Name"
        value={form.firstName}
        onChangeText={text => handleChange('firstName', text)}
      />
      <TextInput
        placeholder="Last Name"
        value={form.lastName}
        onChangeText={text => handleChange('lastName', text)}
      />
      <TextInput
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={form.height.toString()}
        onChangeText={text => handleChange('height', parseInt(text))}
      />
      <TextInput
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={form.weight.toString()}
        onChangeText={text => handleChange('weight', parseInt(text))}
      />
      <TextInput
        placeholder="Gender"
        value={form.gender}
        onChangeText={text => handleChange('gender', text)}
      />
      <TextInput
        placeholder="Address"
        value={form.residence}
        onChangeText={text => handleChange('residence', text)}
      />
      <TextInput
        placeholder="Photo URL"
        value={form.photo}
        onChangeText={text => handleChange('photo', text)}
      />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

export default UserForm;
