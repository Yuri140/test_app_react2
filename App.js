import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native'; // Added 'Image' import
import { Camera } from 'expo-camera';
import { FontAwesome } from "@expo/vector-icons";

export default function App() {
  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back); // Corrected the type constant
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null); // Corrected the variable name
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>nao tem Permissao</Text>;
  }

  async function takePicture() { // Renamed the function to 'takePicture'
    if (camRef.current) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
      console.log(data);
      salvarImagemFirebase();
    }
  }




  return (
    <View style={styles.container}>
      <Camera
        style={{ height: 535, width: 410 }}
        type={type}
        ref={camRef}
      >
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
          <TouchableOpacity style={{ position: 'absolute', bottom: 20, left: 20 }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back);
            }}>
            <Text style={{ fontSize: 20, marginBottom: 13, color: '#fff' }}>Trocar</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <FontAwesome name="camera" size={23} color='#FFF' />
      </TouchableOpacity>

      {capturedPhoto && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={open}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>

            <Image // Corrected the tag name to 'Image'
              style={{ width: '100%', flex: 1, borderRadius: 20 }}
              source={{ uri: capturedPhoto }}
            />

            <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
              <FontAwesome name="window-close" size={50} color="#FF0000" />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
    height: 50,
    width: 300,
  }



});

let storage = firebase.storage()

function salvarImagemFirebase() {

  const nomeImagem = "imagem1"

  const upload = storage.ref().child("produtos/").child(nomeImagem).put(capturedPhoto)


}