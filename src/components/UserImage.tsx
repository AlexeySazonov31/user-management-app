import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface UserImageProps {
  photoUrl?: string;
  size?: number;
  customStyle?: ViewStyle;
}

const UserImage: React.FC<UserImageProps> = ({
  photoUrl,
  size = 60,
  customStyle,
}) => {
  const [isValidImage, setIsValidImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (photoUrl) {
      const checkImage = async () => {
        try {
          const response = await fetch(photoUrl);
          if (response.ok) {
            setIsValidImage(true);
          } else {
            setIsValidImage(false);
          }
        } catch {
          setIsValidImage(false);
        } finally {
          setLoading(false);
        }
      };

      checkImage();
    } else {
      setLoading(false);
    }
  }, [photoUrl]);

  return (
    <View style={[styles.container, {width: size, height: size}, customStyle]}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : isValidImage ? (
        <Image
          source={{uri: photoUrl}}
          style={[{width: size, height: size, borderRadius: size / 2}]}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            {width: size, height: size, borderRadius: size / 2},
          ]}>
          <Icon name="account" size={size / 2.5} color="#888" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  placeholder: {
    borderRadius: 60,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserImage;
