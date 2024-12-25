import React, { useState } from "react";
import { Stack } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
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

const { width } = Dimensions.get('window');

type TabRoute = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

const Header = ({ title }: { title: string }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

export default function Landing() {
  const [activeScreen, setActiveScreen] = useState(0);
  const scrollViewRef = React.useRef<ScrollView>(null);
  
  const tabs: TabRoute[] = [
    { 
      name: 'Home', 
      icon: 'home-outline',
      activeIcon: 'home',
    },
    { 
      name: 'Practice', 
      icon: 'book-outline',
      activeIcon: 'book',
    },
    { 
      name: 'Me', 
      icon: 'person-outline',
      activeIcon: 'person',
    }
  ];
  
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const screenIndex = Math.round(scrollPosition / width);
    setActiveScreen(screenIndex);
  };

  const handleTabPress = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true
    });
    setActiveScreen(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
   
      <ScrollView 
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Home Screen */}
        <View style={styles.screen}>
          <Header title="EduLab" />
          <ScrollView>
            <View style={styles.welcomeContainer}>
              <Image 
                source={require('../assets/images/elephant.png')}
                style={styles.elephantImage}
              />
              <View style={styles.welcomeTextContainer}>
                <Text style={styles.welcomeText}>Welcome, User! 👋</Text>
                <Text style={styles.subText}>
                  Let's continue your exploration with <Text style={styles.highlight}>EduLab</Text>!
                </Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>Modules</Text>
            <View style={styles.modulesContainer}>
              {[1, 2, 3, 4, 5].map((item) => (
                <View key={item} style={styles.moduleCard} />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Practice Screen */}
        <View style={styles.screen}>
          <Header title="Practice" />
          <ScrollView>
            <Text style={styles.sectionTitle}>My Task</Text>
            <View style={styles.tasksContainer}>
              {[1, 2, 3].map((item) => (
                <View key={item} style={styles.taskCard} />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Profile Screen - No Header */}
        <View style={[styles.screen, styles.profileScreen]}>
          <ScrollView>
            <View style={styles.profileContainer}>
              <View style={styles.profileCard} />
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.bottomContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => handleTabPress(index)}
          >
            <Ionicons
              name={activeScreen === index ? tab.activeIcon : tab.icon}
              size={24}
              color={activeScreen === index ? "#5C63D8" : "#666"}
            />
            <Text
              style={[
                styles.tabText,
                activeScreen === index && styles.activeTabText
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1C4E9',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1C4E9',
    borderBottomWidth: 2,
    borderBottomColor: '#C5B6E0',
    opacity: 0.8,
  },
  headerText: {
    fontSize: 20,
    color: '#5C63D8',
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  screen: {
    width: width,
    height: '100%',
  },
  profileScreen: {
    paddingTop: 20, // Add some top padding since there's no header
  },
  welcomeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  elephantImage: {
    width: 150,
    height: 150,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 800,
    color: '#5C63D8',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#333',
  },
  highlight: {
    color: '#5C63D8',
    fontWeight: 800,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#5751FF',
    paddingHorizontal: 16,
    // marginBottom: 10,
  },
  modulesContainer: {
    padding: 16,
  },
  moduleCard: {
    height: 100,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tasksContainer: {
    padding: 16,
  },
  taskCard: {
    height: 100,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileContainer: {
    padding: 16,
  },
  profileCard: {
    height: 200,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomContainer: {
    flexDirection: "row",
    backgroundColor: "#F3E5F5",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    position: "absolute",
    bottom: 0,
    width: width,
    height: 60,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: "#666",
  },
  activeTabText: {
    color: "#5C63D8",
  },
});