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

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    try {
      // Ganti URL localhost sesuai kebutuhan
      const response = await fetch('https://backendedulab.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Simpan token ke AsyncStorage
        await AsyncStorage.setItem('email', result.email || '');
        await AsyncStorage.setItem('name', result.name || '');
        

        // Redirect ke halaman landing
        router.replace('/landing');
      } else {
        setErrorMessage(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setErrorMessage('An error occurred while logging in. Please try again.');
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
        <Text style={styles.title}>Sign In</Text>
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
          style={styles.signInButton}
          onPress={handleSignIn} // Memastikan fungsi dipanggil
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push('/signUp')}
        >
          <Text style={styles.signUpText}>New to EduLab? Sign Up now.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1C4E9',
    paddingTop: 100,
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
    fontWeight: '700',
  },
  signInButton: {
    backgroundColor: '#5C63D8',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },
  signUpText: {
    textAlign: 'center',
    color: '#000',
    marginTop: 16,
    fontSize: 14,
    fontWeight: '700',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});