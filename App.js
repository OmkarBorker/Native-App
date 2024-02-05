import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Authentication from './Src/Auth';
import Form from './Src/Form';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
  console.log('this is debug message from app')
  const [authenticated, setAuthenticated] = useState(false);

  const handleAuthenticated = () => {
    setAuthenticated(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authenticated ? (
          <Stack.Screen name="Form" component={Form} options={{title:'Innovease India Private Limited'}} /> // Render the Form component upon successful authentication
        ) : (
          <Stack.Screen name="Authentication" component={Authentication} options={{ headerShown: false }} />
        )}
        <Stack.Screen
                    name="Form"
                    component={Form}
                    options={{
                        title: 'Pre-Screening Form',
                    }}
                />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;

