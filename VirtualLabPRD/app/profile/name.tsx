import { Stack, router } from 'expo-router';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function Name() {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: '#D1C4E9' },
            headerRight: undefined,
            headerBackVisible: true,
          }} 
        />
        
        <View style={styles.content}>
          <Image 
            source={require('@/assets/images/elephant.png')}
            style={styles.logo} 
          />
          <Text style={styles.name}>Nicholas Ependi</Text>
          <Text style={styles.description}>
            EduLab Name is the only credential for your account. 
            It can't be changed.
          </Text>
          
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D1C4E9',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    logo: {
      width: 200,
      height: 200,
      marginBottom: 24,
      opacity: 0.5
    },
    name: {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 16,
      color: '#5C63DB',
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      color: '#333',
      marginBottom: 40,
      paddingBottom: 50,
    },
  });