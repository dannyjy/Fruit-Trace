import { Button, Image, ScrollView, View, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import { Link } from 'expo-router';

const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const Index = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLibraryPermission, setHasLibraryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');
      setHasLibraryPermission(libraryStatus === 'granted');
    })();
    loadImage();
  }, []);

  const submit = async () => {
    if (!image) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'upload.jpg',
      });

      const response = await fetch('http://192.168.39.241:8000/api/upload/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);

        // Navigate based on the classification
        if (data.detection_result.classification === 'Rotten') {
          navigation.navigate('results', {
            img : data.image_url
          });
        } else {
          navigation.navigate('edible' , {
            img : data.image_url
          });
        }
      } else {
        Alert.alert('Error', 'Upload failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while uploading the image');
    } finally {
      setIsUploading(false);
    }
  };

  const loadImage = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImage(imgDir + files[0]);
    }
  };

  const selectImage = async (useLibrary) => {
    if (useLibrary && !hasLibraryPermission) {
      Alert.alert('Permission Required', 'Library access is required to select images.');
      return;
    }
    if (!useLibrary && !hasCameraPermission) {
      Alert.alert('Permission Required', 'Camera access is required to take photos.');
      return;
    }

    const result = await (useLibrary
      ? ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.75,
        })
      : ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.75,
        }));

    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri) => {
    await ensureDirExists();
    const filename = new Date().getTime() + '.png';
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImage(dest);
  };

  const clearImage = () => {
    setImage(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, gap: 20, backgroundColor: 'white' }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          width: '90%',
          marginHorizontal: 20,
          marginTop: 15,
        }}
      >
        <Link href={'/'}>
          <Image source={icons.arrow} style={{ width: 20, height: 20 }} />
        </Link>
        <TouchableOpacity onPress={() => selectImage(true)}>
          <Image style={{ width: 25, height: 25 }} source={icons.upload} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectImage(false)}>
          <Image style={{ width: 25, height: 25 }} source={icons.camera} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {image && (
          <Image
            key={image}
            source={{ uri: image }}
            style={{ width: 300, height: 300, alignSelf: 'center', borderRadius: 25, marginVertical: 20 }}
          />
        )}
      </ScrollView>
      {image && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
          <TouchableOpacity onPress={clearImage}>
            <Image style={{ width: 40, height: 40 }} source={icons.Wrong} />
          </TouchableOpacity>

          <TouchableOpacity onPress={submit}>
            <Image style={{ width: 40, height: 40 }} source={icons.Right} />
          </TouchableOpacity>
        </View>
      )}
      {isUploading && <ActivityIndicator size="large" color="#0000ff" />}
    </SafeAreaView>
  );
};

export default Index;