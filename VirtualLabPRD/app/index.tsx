import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

const { width } = Dimensions.get('window');

export default function Index() {
  const [activeScreen, setActiveScreen] = useState(0);
  const router = useRouter();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const screenIndex = Math.round(scrollPosition / width);
    setActiveScreen(screenIndex);
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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/signIn')}
              style={{ marginRight: 15 }}
            >
            <Text style={{ color: "#5C63D8", fontSize: 16, fontWeight: "bold" }}>
              SIGN IN
            </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView 
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* First Screen */}
        <View style={styles.screen}>
          <View style={styles.contentContainer}>
            <Image
              source={require("../assets/images/engineer.png")}
              style={[styles.elephantImage, { resizeMode: 'contain' }]}
            />
            <Text style={styles.title}>Introduction To{'\n'}Engineering and{'\n'}Design</Text>
            <Text style={styles.description}>
              <Text style={styles.highlight}>EduLab</Text> is your trusted partner,
              ready to guide you every step of the way
            </Text>
          </View>
        </View>

        {/* Second Screen */}
        <View style={styles.screen}>
          <View style={styles.contentContainer}>
            <Image
              source={require("../assets/images/books.png")}
              style={[styles.booksImage, { resizeMode: 'contain' }]}
            />
            <Text style={styles.title}>Unlock Your Potential{'\n'}With Fun and Easy{'\n'}Learning!</Text>
            <Text style={styles.description}>Join now, no reason to wait.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomContainer}>
        <View style={styles.indicatorContainer}>
          {[0, 1].map((index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                activeScreen === index && styles.activeIndicator
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button}
          onPress={() => router.push('/signUp')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D1C4E9",
  },
  scrollView: {
    flex: 1,
  },
  screen: {
    width: width,
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  elephantImage: {
    marginTop: 80,
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  booksImage: {
    marginTop: 80,
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#5C63D8",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 24,
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  highlight: {
    color: "#5C63D8",
    fontWeight: "900",
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: "#D1C4E9",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    backgroundColor: "#F3E5F5",
    borderRadius: 999, // Large value ensures perfect circle
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#5C63D8",
  },
  button: {
    backgroundColor: "#5C63D8",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});