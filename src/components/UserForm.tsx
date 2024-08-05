import React, {useState} from 'react';
import {
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {createUser, updateUser} from '../store/usersSlice';
import {NewOrUpdateUser} from '../models/User';
import {AppDispatch} from '../store';
import UserImage from './UserImage';

const UserForm: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const {user} = route.params || {};
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState<NewOrUpdateUser>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    height: user?.height || '',
    weight: user?.weight || '',
    gender: user?.gender || '',
    residence: user?.residence || '',
    photo: user?.photo || '',
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (
    name: keyof NewOrUpdateUser,
    value: string | number,
  ) => {
    setForm(prevForm => ({...prevForm, [name]: value}));
  };

  const handleSubmit = async () => {
    try {
      if (user?.id) {
        await dispatch(updateUser({id: user.id, ...form})).unwrap();
      } else {
        await dispatch(createUser(form)).unwrap();
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to save user');
    }
  };

  const genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <UserImage
            photoUrl={form.photo}
            size={120}
            customStyle={{marginVertical: 10}}
          />
          <Text style={styles.title}>
            {user ? 'Edit User' : 'Add New User'}
          </Text>
        </View>
        {renderTextInput('First Name', 'firstName')}
        {renderTextInput('Last Name', 'lastName')}
        {renderTextInput('Height (cm)', 'height', 'numeric')}
        {renderTextInput('Weight (kg)', 'weight', 'numeric')}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalVisible(true)}>
          <Text
            style={
              form.gender ? styles.pickerText : styles.pickerTextPlaceholder
            }>
            {form.gender || 'Select Gender'}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={form.residence}
          onChangeText={text => handleChange('residence', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Photo URL"
          value={form.photo}
          onChangeText={text => handleChange('photo', text)}
        />
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Gender Selection */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={genderOptions}
              keyExtractor={item => item.value}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    handleChange('gender', item.value);
                    setModalVisible(false);
                  }}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.option}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  function renderTextInput(
    placeholder: string,
    fieldName: keyof NewOrUpdateUser,
    keyboardType: 'default' | 'numeric' = 'default',
  ) {
    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={form[fieldName]?.toString() || ''}
        keyboardType={keyboardType}
        onChangeText={text =>
          handleChange(
            fieldName,
            keyboardType === 'numeric' ? parseInt(text) : text,
          )
        }
      />
    );
  }
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
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pickerTextPlaceholder: {
    fontSize: 15,
    color: '#c5c5c7',
  },
  pickerText: {
    fontSize: 15,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  option: {
    padding: 10,
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  cancel: {
    color: '#e61919',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  footer: {
    padding: 16,
    // borderTopWidth: 1,
    // borderTopColor: '#ddd',
    backgroundColor: '#f8f8f8',
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
});

export default UserForm;
