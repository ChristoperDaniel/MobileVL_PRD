import { Stack } from 'expo-router';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

export default function About() {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            headerTitle: "About Us",
            headerStyle: { backgroundColor: '#D1C4E9' },
            headerTitleStyle: {
              color: '#5C63D8',
              fontSize: 20,
              fontWeight: '900',
            },
            headerTintColor: '#5C63D8',
          }} 
        />
   
        <ScrollView style={styles.content}>
          <Image 
            source={require('@/assets/images/engineer.png')}
            style={styles.logo}
          />
   
          <Text style={styles.text}>
            Welcome to <Text style={styles.highlight}>Introduction to Engineering and Design</Text>, 
            a foundational course aimed at equipping students with the essential skills and knowledge to 
            succeed in the dynamic field of engineering. This course is designed to introduce students to 
            the core principles of engineering, including problem-solving, creative thinking, and design 
            processes, while fostering a hands-on learning experience through practical projects.
          </Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}><Text style={styles.highlight}>EduLab</Text> © 2024</Text>
          </View>
        </ScrollView>
      </View>
    );
   }
   
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D1C4E9',
    },
    content: {
      padding: 16,
    },
    logo: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      marginVertical: 24,
      opacity: 0.6,
    },
    text: {
      fontSize: 20,
      color: '#333',
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 30,
    },
    highlight: {
      color: '#5C63D8',
      fontWeight: '800',
    },
    footer: {
      paddingVertical: 25,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 15,
      fontWeight: 800,
      color: '#666',
      paddingBottom: 20,
    },
});