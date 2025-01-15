import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function Sign() {
  const [name, setName] = useState('');
  const router = useRouter()

  const handleConfirm = () => {
    // Handle the confirmation logic here
    console.log('Name submitted:', name);
  };

  return (
    <SafeAreaView style={styles.container}>
        <Stack.Screen
            options={{headerShown: false}}
        />

      <View style={styles.content}>
        <Text style={styles.title}>Hola!</Text>
        
        <Text style={styles.subtitle}>
          Please enter your name to identify yourself.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress ={() => router.push('/landing')}
        //   onPress={handleConfirm}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

        <Text style={styles.privacyText}>
          Be assured that your data is handled with privacy and security in mind
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1C4E9', 
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 225,
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    color: '#5C63D8', 
    marginBottom: 20,
    fontWeight: 900,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FAF8FC',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#5C63D8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  privacyText: {
    fontSize: 10,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});