import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import { Platform, StatusBar as RNStatusBar } from 'react-native';
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
  Alert,
} from "react-native";

const { width } = Dimensions.get('window');
const footer_height = 45;

type TabRoute = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

const Header = ({ title }: { title: string }) => (
  <View style={styles.header}>
    <SafeAreaView>
      <Text style={styles.headerText}>{title}</Text>
    </SafeAreaView>
  </View>
);

type Module = {
  id: number;
  title: string;
  image: any;
  href: "/home/module1" | "/home/module2" | "/home/module3" | "/home/module4" | "/home/module5";
}

type Task = {
  id: number;
  title: string;
  image: any;
  href: "/practice/task1" | "/practice/task2" | "/practice/task3" | "/practice/task4" | "/practice/task5";
}

type MenuItem = {
  id: number;
  title: string;
  icon: string;
  screen: "/profile/quizresults" | "/profile/settings";
};

const TaskCard = ({ task }: { task: Task }) => {
  const handleStartQuiz = () => {
    Alert.alert(
      "Start Quiz",
      "Are you sure you want to start the quiz?\nThe quiz can only be taken once.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Start",
          style: "default",
          onPress: () => router.push(task.href)
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.taskCard}>
      <Image
        source={task.image}
        style={styles.taskImage}
        resizeMode="cover"
      />
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <TouchableOpacity 
          style={styles.readButton}
          onPress={handleStartQuiz}
        >
          <Text style={styles.readButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

  const modules: Module[] = [
    {
      id: 1,
      title: "Introduction to Engineering and Design",
      image: require('../assets/images/module1.png'),
      href: "/home/module1"
    },
    {
      id: 2,
      title: "Professional Engineering Ethics",
      image: require('../assets/images/module2.png'),
      href: "/home/module2"
    },
    {
      id: 3,
      title: "Aspects of Engineering and Problem-Solving Methods",
      image: require('../assets/images/module3.png'),
      href: "/home/module3"
    },
    {
      id: 4,
      title: "Engineering Design Process Problem Definition & Gathering Information",
      image: require('../assets/images/module4.png'),
      href: "/home/module4"
    },
    {
      id: 5,
      title: "Engineering Design Process Concept Generation, Concept Selection, Prototyping & Testing",
      image: require('../assets/images/module5.png'),
      href: "/home/module5"
    }
  ];

  const tasks: Task[] = [
    {
      id: 1,
      title: "Introduction to Engineering and Design",
      image: require('../assets/images/quiz1.jpg'),
      href: "/practice/task1"
    },
    {
      id: 2,
      title: "Professional Engineering Ethics",
      image: require('../assets/images/quiz2.jpg'),
      href: "/practice/task2"
    },
    {
      id: 3,
      title: "Aspects of Engineering and Problem-Solving Methods",
      image: require('../assets/images/quiz3.jpg'),
      href: "/practice/task3"
    },
    {
      id: 4,
      title: "Engineering Design Process Problem Definition & Gathering Information",
      image: require('../assets/images/quiz4.jpg'),
      href: "/practice/task4"
    },
    {
      id: 5,
      title: "Engineering Design Process Concept Generation, Concept Selection, Prototyping & Testing",
      image: require('../assets/images/quiz5.jpg'),
      href: "/practice/task5"
    }
  ];

  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: 'Quiz Results',
      icon: 'assignment',
      screen: "/profile/quizresults"
    },
    {
      id: 2,
      title: 'Settings',
      icon: 'settings',
      screen: "/profile/settings"
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <StatusBar backgroundColor="#D1C4E9" style="dark" />
   
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
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
              {modules.map((module) => (
                <View key={module.id} style={styles.moduleCard}>
                  <Image
                    source={module.image}
                    style={styles.moduleImage}
                    resizeMode="cover"
                  />
                  <View style={styles.moduleContent}>
                    <Text style={styles.moduleTitle}>{module.title}</Text>
                    <TouchableOpacity 
                      style={styles.readButton}
                      onPress={() => router.push(module.href)}
                    >
                      <Text style={styles.readButtonText}>Read</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Practice Screen */}
        <View style={styles.screen}>
          <Header title="Practice" />
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.sectionTitle}>My Task</Text>
            <View style={styles.tasksContainer}>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Profile Screen */}
        <View style={styles.screen}>
          <ScrollView>
            <Text style={styles.profileTitle}>My Profile</Text>
            <View style={styles.profileSection}>
              <View style={styles.profileHeader}>
                <Image
                  source={require('../assets/images/elephant.png')}
                  style={styles.avatar}
                />
              <Text style={styles.userName}>Nicholas Ependi</Text>
              <Text style={styles.userRole}>Student</Text>
              </View>

              <View style={styles.menuContainer}>
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.menuItem}
                    onPress={() => router.push(item.screen)}
                  >
                    <View style={styles.menuItemContent}>
                      <Icon name={item.icon} size={24} color="#5C63DB" />
                      <Text style={styles.menuItemText}>{item.title}</Text>
                    </View>
                    <Icon name="chevron-right" size={24} color="#5C63DB" />
                  </TouchableOpacity>
                ))}
              </View>
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
    minHeight: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1C4E9',
    borderBottomWidth: 2,
    borderBottomColor: '#C5B6E0',
    opacity: 0.8,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
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
  scrollViewContent: {
    paddingBottom: footer_height,
  },
  welcomeContainer: {
    flexDirection: 'row',
    paddingRight: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  elephantImage: {
    width: 150,
    height: 100,
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
    fontSize: 18,
    fontWeight: 800,
    color: '#5C63D8',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  modulesContainer: {
    padding: 16,
  },
  moduleCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moduleImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  moduleContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  readButton: {
    backgroundColor: '#5C63D8',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  readButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  tasksContainer: {
    padding: 16,
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  taskContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: '#5C63D8',
    marginTop: 50,
    textAlign: 'center',
  },
  profileSection: {
    paddingTop: 50,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  userName: {
    fontSize: 25,
    fontWeight: 900,
    textAlign: 'center',
    color: '#5C63DB',
  },
  userRole: {
    fontSize: 18,
    color: '#666',
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
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