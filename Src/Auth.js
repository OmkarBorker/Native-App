
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const Authentication = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    const handleAuthenticated = () => {
        setAlertMessage('Authentication successful');
        setShowAlert(true);
        // Perform any necessary actions upon successful authentication
        // Navigate to another screen or perform other logic here if needed
        setTimeout(() => {
            navigation.navigate('Form'); // Navigate to the Form screen
        }, 1000);
    };

    const handleSubmit = () => {
        // Perform authentication logic here
        if (!/^\d{10}$/.test(phoneNumber)) {
            setAlertMessage('Invalid phone number');
            setShowAlert(true);
        } else if (password === '') {
            setAlertMessage('Invalid password');
            setShowAlert(true);
        } else {
            setAlertMessage('Authentication successful');
            setShowAlert(true);
            handleAuthenticated();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Authentication</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
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
            <Button title="Login" onPress={handleSubmit} />

            <Modal isVisible={showAlert} animationIn="zoomIn" animationOut="zoomOut">
                <View style={styles.alertContainer}>
                    <Text style={styles.alertText}>{alertMessage}</Text>
                    <Button title="Close" onPress={() => setShowAlert(false)} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 250,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    alertContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        justifyContent: 'center',
        height: 150,
        alignItems: 'center',
    },
    alertText: {
        fontSize: 18,
        marginBottom: 16,
    },
});

export default Authentication;
