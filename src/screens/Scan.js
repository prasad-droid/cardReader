import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {useNavigation, useRoute} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons'
export default function Scan() {
  const navigation = useNavigation();


  // set camera as back Camera
  const device = useCameraDevice('back', {
    physicalDevices: ['wide-angle-camera'],
  });
  const [flash, setFlash] = useState('auto')
  const [imgData, setImgData] = useState('');
  const [takePhotoClicked, setTakePhotoClicked] = useState(false);
  const [textResult, setTextResult] = useState(null);

  // to check if user have the permissions
  useEffect(() => {
    checkPermission();
  }, []);
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    // console.log(newCameraPermission);
  };

  // Reference to the camera
  const cameraRef = useRef(null);


  const onFlashPressed = () => {
    setFlash((f) => (f === 'off' ? 'on' : 'off'))
  }

  // Function to take picture
  const TakePicture = async () => {
    if (cameraRef != null) {
      const photo = await cameraRef.current.takePhoto({flash:flash});
      const imgPath = 'file://' + photo.path;
      setImgData(imgPath);
      console.log('PhotoCapture : ' + imgPath);
      setTakePhotoClicked(false);
    }
  };

  const openFile = () => {
    try {
      let options = {mediaType: 'photo'};
      launchImageLibrary(options, async response => {
        if (response.didCancel) {
          console.log('Image selection cancelled');
        } else if (response.error) {
          console.error('Image selection error:', response.error);
        } else {
          console.log('Selected Image URI:', response.assets[0].uri);
          setImgData(response.assets[0].uri);
        }
      });
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  // function to do OCR
  const doOCR = async () => {
    console.log(imgData);
    if (imgData !== '') {
      try {
        console.log('Before OCR' + imgData);
        const result = await TextRecognition.recognize(imgData);
        setTextResult(result);
      } catch (ocrError) {
        console.error('OCR Error:', ocrError);
      } finally {
        console.log('Done OCR');
      }
    } else {
      openFile();
    }
  };
  
  useEffect(() => {
    if (textResult) {
      (async () => {
        try {
          const recognized = await splitText();
          console.log(recognized);
          navigation.navigate('Contact', recognized);
        } catch (error) {
          console.error('Error processing OCR result:', error);
        } finally {
          console.log('Done OCR');
        }
      })();
    }
  }, [textResult]);
  
  

  // regex
  const splitText = async () => {
    let businessName='', phoneNumber='', website='', email='';

    console.log('Inside splitText');
    let text = await textResult.text;
    console.log(text);
    businessName = text.match(/([A-z]{2,} [A-z]{2,})/);
    phoneNumber = text.match(
      /(?:\+91\s?)?(\d{10})|\b(\d{4}-\d{8}|\d{4}\s?\d{7}|\d{3}-\d{7})\b/g,
    );
    website = text.match(
      '(http(s)?://)?(www.)?[a-zA-Z0-9.-]+.[a-zA-Z]{2,}(.[a-zA-Z]{2,})?',
    );
    email = text.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,}| [a-zA-Z]{2,})/g,
    );

    businessName = businessName != null ? businessName[0] : '';
    phoneNumber = phoneNumber != null ? phoneNumber[0] : '';
    website = website != null ? website : '';
    email = email != null ? email : '';

    console.log(`Business Name: ${businessName}`);
    console.log(`Phone Number: ${phoneNumber}`);
    console.log(`website : ${website}`);
    console.log(`Email: ${email}`);
    return {
      name: businessName,
      job: '',
      website: website,
      contact1: phoneNumber,
      email: email,
    };
  };

  // if no device is found
  if (device == null) return <ActivityIndicator></ActivityIndicator>;
  console.log(flash);
  return (
    <View style={{flex: 1}}>
      {takePhotoClicked ? (
        <View style={{flex: 1}}>
        {/* <View>
        <TouchableOpacity style={styles.button} onPress={onFlashPressed} disabledOpacity={0.4}>
             <IonIcon name={flash === 'on' ? 'flash' : 'flash-off'} color="black" size={40} />
            <Text> Flash </Text>
          </TouchableOpacity>
        </View> */}
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
            flash={flash}
          />
          <TouchableOpacity
            style={styles.cameraBtn}
            onPress={TakePicture}></TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
            display: 'flex',
          }}>
          {imgData != '' && (
            <Image
              source={{uri: imgData}}
              style={{width: '90%', height: 200, borderRadius: 10}}
            />
          )}
          <TouchableOpacity style={styles.clickBtn}>
            <Text
              onPress={() => {
                setTakePhotoClicked(true);
              }}
              style={{color: '#000'}}>
              Click Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clickBtn}>
            <Text
              onPress={() => {
                openFile();
              }}
              style={{color: '#000'}}>
              Select From Galary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clickBtn}>
            <Text
              onPress={() => {
                doOCR();
              }}
              style={{color: '#000'}}>
              doOcr
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
  },
  clickBtn: {
    width: 90,
    height: 50,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
  camera:{
    flex:1,
    height:200
  }
});
