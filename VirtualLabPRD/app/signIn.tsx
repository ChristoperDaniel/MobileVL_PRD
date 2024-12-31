import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Stack, Link, useRouter } from 'expo-router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

//   const handleSignIn = () => {
//     console.log('Signing in with:', email, password);
//     // Add your sign-in logic here
//   };

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

        <TouchableOpacity 
          style={styles.signInButton}
          onPress ={() => router.push('/landing')}
        //   onPress={handleSignIn}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress ={() => router.push('/signUp')}
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
    fontWeight: 700,
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
    fontWeight: 700,
  },
});