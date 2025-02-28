import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import * as imagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import React, { useEffect, useState } from 'react'
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

const index = () => {
  const [image, setImage] = useState(null); // Change to store a single image
  const [put, setPut] = useState(false)
  
  const handlePut = () => {
    setPut(!put)
  }

  useEffect(() => {
    loadImage();
  }, []);

  const loadImage = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImage(imgDir + files[0]); // Set the first image (if any)
    }
  };

  const selectImage = async (useLibrary) => {
    let result;
    if (useLibrary) {
      result = await imagePicker.launchImageLibraryAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.75
      });
      handlePut();
    } else {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        alert("Camera permission is required!");
        return;
      }
      result = await imagePicker.launchCameraAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.75
      });
    }
    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
  };

  const requestCameraPermission = async () => {
    const { status } = await imagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  };

  const saveImage = async (uri) => {
    await ensureDirExists(); // Ensure directory exists before saving the image
    const filename = new Date().getTime() + '.png';
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImage(dest); // Store only the new image
  };

  return (
    <SafeAreaView style={{ flex: 1, gap: 20 , backgroundColor:'white'}}>
      <View style={{ paddingHorizontal:15 , paddingTop: 15}}>
        <Link href={'/'}><Image source={icons.arrow} style={{width:20 , height:20}}/></Link>
      </View>
      <ScrollView>
        {image && (
          <Image key={image} source={{ uri: image }} style={{ width: '100%', height: 300, alignSelf: 'center' ,borderRadius: 10}} />
        )}
        <View style={{margin: 10}}>
          <Button disabled={put} onPress={() => selectImage(true)} title='Select Image' />
        </View>
      </ScrollView>
      {image && <Link href={'/'} style={{width:'100%',flex:1, marginLeft:'45%', alignItems:'center', position:'absolute' , bottom:30}}><Image source={icons.upload} style={{width:40, height:40,alignItems:'center' , justifyContent:'center'}}/></Link>}
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
