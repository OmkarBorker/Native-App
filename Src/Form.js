import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const Form = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [occupation, setOccupation] = useState("");
  const [address, setAddress] = useState("");
  const [history,setHistory] =  useState("");
  const [leftEyeSn, setleftEyeSn] = useState("");
  const [rightEyeSn, setrightEyeSn] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState(null);
  const [selectedImageBase64_2,setselectedImageBase64_2] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  // const handleImagePick = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setSelectedImage(result.uri);
  //     console.log("Image picked:", result.uri);
  //     const base64Image = await convertImageToBase64(result.uri);
  //     setSelectedImageBase64(base64Image);
  //   }
  // };
  const handleImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8, // Adjust image quality as needed
      });

      if (!result.canceled) {
        setSelectedImage(result.uri);
        console.log("Image picked:", result.uri);
        const base64Image = await convertImageToBase64(result.uri);
        setSelectedImageBase64(base64Image);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick an image");
    }
  };

  const handleImagePick2 = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8, // Adjust image quality as needed
      });

      if (!result.canceled) {
        setSelectedImage2(result.uri);
        console.log("Image picked:", result.uri);
        const base64Image = await convertImageToBase64(result.uri);
        setselectedImageBase64_2(base64Image);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick an image");
    }
  };

  const handleCameraCapture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
      console.log("Image captured from camera:", result.uri);
      const base64Image = await convertImageToBase64(result.uri);
      setSelectedImageBase64(base64Image);
    }
  };
  const handleCameraCapture2 = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage2(result.uri);
      console.log("Image captured from camera:", result.uri);
      const base64Image = await convertImageToBase64(result.uri);
      setselectedImageBase64_2(base64Image);
    }
  };


  // const convertImageToBase64 = async (imageUri) => {
  //   let base64 = "";
  //   try {
  //     const fileUri = imageUri;
  //     const base64Image = await FileSystem.readAsStringAsync(fileUri, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });
  //     base64 = `data:image/jpg;base64,${base64Image}`;
  //   } catch (error) {
  //     console.log("Error converting image to base64:", error);
  //   }
  //   return base64;
  // };
  const convertImageToBase64 = async (imageUri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.log("Error converting image to base64:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!name || !age || !sex || !occupation || !address ||!history|| !selectedImageBase64 || !selectedImageBase64_2) {
      Alert.alert("Error", "Please fill in all fields including the image");
      return;
    }

    try {
      const formData = {
        name,
        age,
        sex,
        occupation,
        address,
        history,
        characters1: leftEyeSn,
        characters2: rightEyeSn,
        image: selectedImageBase64,
        image2: selectedImageBase64_2,
      };
      console.log("trial")
      const response = await fetch('http://192.168.0.103:5000/process_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert("Success", "Form submitted successfully");
      } else {
        Alert.alert("Error", "Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Error", "Failed to submit form");
    }
  };


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    enabled
>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Sex</Text>
        <TextInput
          style={styles.input}
          placeholder="Sex"
          value={sex}
          onChangeText={setSex}
        />
        <Text style={styles.label}>Occupation</Text>
        <TextInput
          style={styles.input}
          placeholder="Occupation"
          value={occupation}
          onChangeText={setOccupation}
        />
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <Text style={styles.label}>Describe Past History(IF ANY)</Text>
        <TextInput
          style={styles.input}
          placeholder="Medical History"
          value={history}
          onChangeText={setHistory}
        />
        <Text style={styles.warning}>Close either eye before viewing</Text>
        <Image
          source={require("./../assets/SnellensChart.jpg")}
          style={styles.chartImage}
          resizeMode="contain"
        />
        <Text style={styles.label}>Snellen Chart</Text>
        <View style={{flex:2,flexDirection:'row'}}>
        <TextInput
          style={styles.input_reading}
          placeholder="Left Eye Score"
          value={leftEyeSn}
          onChangeText={setleftEyeSn}
        />
        <TextInput
          style={styles.input_reading}
          placeholder="Right Eye Score"
          value={rightEyeSn}
          onChangeText={setrightEyeSn}
        />
        </View>
        <Text></Text>
        <Text style={styles.label}>
          Select a option for image of the left eye Cornea
        </Text>
        <TouchableOpacity
          onPress={handleImagePick}
          style={styles.CaptureButtonGallery}
        >
          <Text style={styles.CaptureButtonText}>
            Pick an image from gallery
          </Text>
        </TouchableOpacity>
        <Text style={styles.label}>OR</Text>
        <TouchableOpacity
          onPress={handleCameraCapture}
          style={styles.CaptureButton}
        >
          <Text style={styles.CaptureButtonText}>Capture from camera</Text>
        </TouchableOpacity>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        )}
         <Text></Text>
        <Text style={styles.label}>
          Select a option for image of the right eye Cornea
        </Text>
        <TouchableOpacity
          onPress={handleImagePick2}
          style={styles.CaptureButtonGallery}
        >
          <Text style={styles.CaptureButtonText}>
            Pick an image from gallery
          </Text>
        </TouchableOpacity>
        <Text style={styles.label}>OR</Text>
        <TouchableOpacity
          onPress={handleCameraCapture2}
          style={styles.CaptureButton}
        >
          <Text style={styles.CaptureButtonText}>Capture from camera</Text>
        </TouchableOpacity>
        {selectedImage2 && (
          <Image source={{ uri: selectedImage2 }} style={styles.selectedImage} />
        )}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  input_reading: {
    width: "30%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 8,
    margin:7
  },
  label: {
    marginBottom: 8,
    fontWeight: "bold",
    fontSize: 18,
  },
  chartImage: {
    width: 600, // Adjust the width according to your image size
    height: 600, // Adjust the height according to your image size
    marginBottom: 16,
  },
  warning: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  CaptureButton: {
    width: "50%",
    height: 40,
    marginBottom: 10,
    borderRadius: 25,
    backgroundColor: "crimson",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    // Increase the height to make it bigger
  },
  CaptureButtonGallery: {
    width: "70%",
    height: 40,
    marginBottom: 5,
    borderRadius: 25,
    backgroundColor: "crimson",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    // Increase the height to make it bigger
  },
  CaptureButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  submitButton: {
    width: "80%",
    height: 50, // Increase the height to make it bigger
    borderRadius: 25,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  selectedImage: {
    width: 300,
    height: 300,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Form;
