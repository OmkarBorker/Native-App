import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,Image,
} from "react-native";
import Modal from "react-native-modal";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const Authentication = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleAuthenticated = async () => {
    try {
      const formData = new FormData();
      formData.append("username", phoneNumber); // Assuming 'name' holds the username
      formData.append("password", password); // Assuming 'password' holds the password
  
      const response = await fetch("http://34.93.148.40:8080/authenticate", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        setAlertMessage(result.message); // Message from the backend
        setShowAlert(true);
  
        // If authentication is successful, navigate to another screen
        setTimeout(() => {
          navigation.navigate("Form"); // Navigate to the Form screen
        }, 1000);
      } else {
        setAlertMessage("Failed to authenticate");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error authenticating:", error);
      setAlertMessage("Failed to authenticate");
      setShowAlert(true);
    }
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const handleUploadID = async () => {
    console.log("uploading");
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (file && !file.canceled) {
        setUploadedFile(file);
        console.log("Done");
      } else {
        console.log("Invalid file or file type");
      }
    } catch (error) {
      console.log("Error selecting file:", error);
    }
  };

  const convertPdfToBase64 = async (fileUri) => {
    try {
      const pdfContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return pdfContent;
    } catch (error) {
      console.error("Error converting PDF to base64:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (isRegistering) {
      if (!/^\d{10}$/.test(phoneNumber)) {
        setAlertMessage("Invalid phone number");
        setShowAlert(true);
      } else if (password !== confirmPassword) {
        setAlertMessage("Passwords do not match");
        setShowAlert(true);
      } else if (name === "" || password === "" || uploadedFile === null) {
        setAlertMessage("Please fill in all fields");
        setShowAlert(true);
      } else {
        try {
          console.log(uploadedFile.assets[0].uri)
          const pdfBase64 = await convertPdfToBase64(uploadedFile.assets[0].uri);

          if (pdfBase64) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("phone_number", phoneNumber);
            formData.append("password", password);
            formData.append("id_document", pdfBase64);
            
            const response = await fetch("http://34.93.148.40:8080/insert_data", {
              method: "POST",
              body: formData,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            if (response.ok) {
              setAlertMessage("Registration successful");
              setShowAlert(true);
              // Optionally perform additional actions upon successful registration
            } else {
              setAlertMessage("Failed to register");
              setShowAlert(true);
            }
          } else {
            setAlertMessage("Failed to convert PDF to base64");
            setShowAlert(true);
          }
        } catch (error) {
          console.error("Error registering:", error);
          setAlertMessage("Failed to register");
          setShowAlert(true);
        }
      }
    } else {
      // Perform authentication logic here (Login)
      // This part is the same as in the initial code
      // You can add your authentication logic here as needed'
      handleAuthenticated();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
            <Image
          source={require("./../assets/Innovease_Logo.jpg")}
          style={styles.chartImage}
          resizeMode="contain"
        />
      <Text style={styles.title}>
        {isRegistering ? "User Registration" : "User Login"}
      </Text>

      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={handleNameChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Phone Number/ID"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />

      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
      )}

      {isRegistering && (
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadID}>
          <Text style={styles.uploadButtonText}>Upload ID (PDF)</Text>
        </TouchableOpacity>
      )}

      {isRegistering && uploadedFile && (
        <View style={styles.uploadedFile}>
          <Text style={{ textAlign: "center" }}>Uploaded File:</Text>
          <Text>Name: {uploadedFile.assets[0].name || "N/A"} </Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title={isRegistering ? "Register" : "Login"}
          onPress={handleSubmit}
        />
      </View>
      <View style={styles.buttonContainerRegister}>
        <Button
          title={isRegistering ? "Switch to Login" : "Switch to Register"}
          onPress={() => setIsRegistering(!isRegistering)}
        />
      </View>

      <Modal isVisible={showAlert} animationIn="zoomIn" animationOut="zoomOut">
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{alertMessage}</Text>
          <Button title="Close" onPress={() => setShowAlert(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 250,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  uploadButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  uploadButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  uploadedFile: {
    marginTop: 20,
    alignItems: "center",
  },
  buttonContainer: {
    width: "50%",
    marginTop: 20,
  },
  buttonContainerRegister: {
    width: "70%",
    marginTop: 20,
  },
  alertContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    justifyContent: "center",
    height: 150,
    alignItems: "center",
  },
  alertText: {
    fontSize: 18,
    marginBottom: 16,
  },
  pdfView: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "black",
  },
  footer:{
    width : "100%",
    height:24,
    padding : "15%",
    textAlign:"center",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  },
  chartImage: {
    width: 200, // Adjust the width according to your image size
    height: 200, // Adjust the height according to your image size
    marginBottom: 16,
  }
});

export default Authentication;

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import Modal from 'react-native-modal';

// const Authentication = ({navigation}) => {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [password, setPassword] = useState('');
//     const [showAlert, setShowAlert] = useState(false);
//     const [alertMessage, setAlertMessage] = useState('');

//     const handlePhoneNumberChange = (value) => {
//         setPhoneNumber(value);
//     };

//     const handlePasswordChange = (value) => {
//         setPassword(value);
//     };

//     const handleAuthenticated = () => {
//         setAlertMessage('Authentication successful');
//         setShowAlert(true);
//         // Perform any necessary actions upon successful authentication
//         // Navigate to another screen or perform other logic here if needed
//         setTimeout(() => {
//             navigation.navigate('Form'); // Navigate to the Form screen
//         }, 1000);
//     };

//     const handleSubmit = () => {
//         // Perform authentication logic here
//         if (!/^\d{10}$/.test(phoneNumber)) {
//             setAlertMessage('Invalid phone number');
//             setShowAlert(true);
//         } else if (password === '') {
//             setAlertMessage('Invalid password');
//             setShowAlert(true);
//         } else {
//             setAlertMessage('Authentication successful');
//             setShowAlert(true);
//             handleAuthenticated();
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Authentication</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Phone Number"
//                 value={phoneNumber}
//                 onChangeText={handlePhoneNumberChange}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={handlePasswordChange}
//             />
//             <Button title="Login" onPress={handleSubmit} />

//             <Modal isVisible={showAlert} animationIn="zoomIn" animationOut="zoomOut">
//                 <View style={styles.alertContainer}>
//                     <Text style={styles.alertText}>{alertMessage}</Text>
//                     <Button title="Close" onPress={() => setShowAlert(false)} />
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 16,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
//     input: {
//         width: '100%',
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         width: 250,
//         marginBottom: 10,
//         paddingHorizontal: 8,
//     },
//     alertContainer: {
//         backgroundColor: 'white',
//         borderRadius: 8,
//         padding: 16,
//         justifyContent: 'center',
//         height: 150,
//         alignItems: 'center',
//     },
//     alertText: {
//         fontSize: 18,
//         marginBottom: 16,
//     },
// });

// export default Authentication;
