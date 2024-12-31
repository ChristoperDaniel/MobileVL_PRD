import { Stack } from 'expo-router';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useState } from 'react';

export default function Password() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            headerTitle: "Password",
            headerStyle: { backgroundColor: '#D1C4E9' },
            headerTitleStyle: {
              color: '#5C63D8',
              fontSize: 20,
              fontWeight: '900',
            },
            headerTintColor: '#5C63D8',
            headerRight: () => (
              <TouchableOpacity>
                <Text style={styles.headerButton}>Done</Text>
              </TouchableOpacity>
            ),
          }} 
        />
   
        <View style={styles.content}>
          <Text style={styles.description}>
            Set EduLab password, so that you can rapidly log in to EduLab.
          </Text>
   
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>nichoependi@gmail.com</Text>
          </View>
   
          <View style={styles.formGroup}>
            <Text style={styles.label}>Old Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="Enter old password"
                secureTextEntry={!showOldPassword}
                placeholderTextColor="#666"
              />
              <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
                <Text style={styles.showHide}>{showOldPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>
          </View>
   
          <View style={styles.formGroup}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                secureTextEntry={!showNewPassword}
                placeholderTextColor="#666"
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Text style={styles.showHide}>{showNewPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>
          </View>
   
          <View style={styles.formGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm password"
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor="#666"
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Text style={styles.showHide}>{showConfirmPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>
          </View>
   
          <Text style={styles.hint}>
            Password must be 8-16 characters and contain both numbers and letters/special characters.
          </Text>
   
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot old password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}
   
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#D1C4E9'
    },
    headerButton: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
      backgroundColor: '#5C63D8',
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 8,
      width: '100%',
    },
    content: {
      padding: 16
    },
    description: {
      fontSize: 16,
      color: '#333',
      marginBottom: 24
    },
    formGroup: {
      marginBottom: 20
    },
    label: {
      color: '#5C63D8',
      fontSize: 16,
      marginBottom: 8
    },
    value: {
      fontSize: 16,
      color: '#333',
      paddingBottom: 8
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#5C63D8',
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#333',
      paddingVertical: 8,
    },
    showHide: {
      color: '#5C63D8',
      fontSize: 14,
      paddingLeft: 10,
    },
    hint: {
      color: '#5C63D8',
      fontSize: 14,
      marginTop: 8
    },
    forgotPassword: {
      color: '#5C63D8',
      fontSize: 14,
      marginTop: 16,
      fontWeight: '800'
    }
});