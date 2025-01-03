import { Stack } from 'expo-router';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
} from "react-native";

export default function Quizresults() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
          headerTitle: "Quiz Results",
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
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1C4E9',
  }
})