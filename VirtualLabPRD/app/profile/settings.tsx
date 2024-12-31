import React from "react";
import { Stack, router } from 'expo-router';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

type Set = {
    id: number;
    title: string;
    href: "/profile/name" | "/profile/password" | "/profile/about";
  };

export default function Settings() {
  const setItems: Set[] = [
    { id: 1, title: 'Name', href: "/profile/name" },
    { id: 2, title: 'Password', href: "/profile/password" },
    { id: 3, title: 'About', href: "/profile/about" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerTitle: "Settings",
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

      <View style={styles.content}>
        {setItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              index === setItems.length - 1 && styles.lastMenuItem
            ]}
            onPress={() => router.push(item.href)}
          >
            <Text style={styles.menuItemText}>{item.title}</Text>
            <Icon name="chevron-right" size={24} color="#5C63D8" />
          </TouchableOpacity>
        ))}

        <View style={styles.accountActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress ={() => router.push('/signIn')}
          >
            <Text style={styles.actionButtonText}>Switch Account</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress ={() => router.push('/')}
          >
            <Text style={styles.actionButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
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
    // paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
    marginBottom: 24,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  accountActions: {
    gap: 10,
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#5C63DB',
    fontWeight: '700',
  },
});