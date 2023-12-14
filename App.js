import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Authentication from './Src/Auth';
import Form from './Src/Form';

const Stack = createStackNavigator();

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleAuthenticated = () => {
    setAuthenticated(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authenticated ? (
          <Stack.Screen name="Form" component={Form} /> // Render the Form component upon successful authentication
        ) : (
          <Stack.Screen name="Authentication" component={Authentication} initialParams={{ onAuthenticated: handleAuthenticated }} options={{ headerShown: false }} />
        )}
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

