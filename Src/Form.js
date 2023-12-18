import React, { useState } from 'react';
import { View,Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import SnellenChart from './SnellensChart';

const Form = () => {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [occupation, setOccupation] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = () => {
        if (!name || !age || !sex || !occupation || !address) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }else{ 
            // Notify parent component about form submission
            setSubmitted(true);
        }

        // Handle form submission here
        console.log('Name:', name);
        console.log('Age:', age);
        console.log('Sex:', sex);
        console.log('Occupation:', occupation);
        console.log('Address:', address);
    };

    return (
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
            <Button
                title="Submit"
                onPress={handleSubmit}
                style={styles.submitButton} 
            />
            {submitted && <SnellenChart />}
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
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    label: {
        marginBottom: 6,
        fontWeight: 'bold',
        fontSize: 16,
    },
    submitButton: {
        width: '100%',
        height: 50, // Increase the height to make it bigger
    },
});

export default Form;
