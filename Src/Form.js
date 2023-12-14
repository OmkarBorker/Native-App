import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const Form = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [occupation, setOccupation] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = () => {
        if (!name || !age || !sex || !occupation || !address) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Handle form submission here
        console.log('Name:', name);
        console.log('Age:', age);
        console.log('Sex:', sex);
        console.log('Occupation:', occupation);
        console.log('Address:', address);
    };

    return (
        <View>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Sex"
                value={sex}
                onChangeText={setSex}
            />
            <TextInput
                placeholder="Occupation"
                value={occupation}
                onChangeText={setOccupation}
            />
            <TextInput
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default Form;
