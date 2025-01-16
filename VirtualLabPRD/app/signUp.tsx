import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim() || !name.trim()) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters');
      return;
    }

    try {
      // Replace 'localhost' with '10.0.2.2' if running on an Android emulator
      // Or replace it with your local machine IP if testing on a physical device
      const response = await fetch('https://backendedulab.vercel.app/api/auth/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }), // Ensure the body includes all fields
      });

      const result = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('name', name);

        router.replace('/landing');  // On successful signup, navigate to the landing page
      } else {
        setErrorMessage(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "EduLab",
          headerStyle: {
            backgroundColor: '#D1C4E9',
          },
          headerTitleStyle: {
            color: '#5C63D8',
            fontSize: 20,
            fontWeight: '900',
          },
          headerTintColor: '#5C63D8',
          headerRight: undefined,
          headerBackVisible: true,
        }}
      />
    
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          keyboardType="default"
          autoCapitalize="words"
          returnKeyType="done"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={handleSignUp} 
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push('/signIn')}
        >
          <Text style={styles.signInText}>Already have an account? Sign In now.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1C4E9',
    paddingTop: 80,
  },
  inputContainer: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 50,
    fontWeight: "900",
    color: "#5C63D8",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FAF8FC',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    fontWeight: 700,
  },
  signUpButton: {
    backgroundColor: '#5C63D8',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },
  signInText: {
    textAlign: 'center',
    color: '#000',
    marginTop: 16,
    fontSize: 14,
    fontWeight: 700,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});