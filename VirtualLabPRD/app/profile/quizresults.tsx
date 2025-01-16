import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get quiz status from API
  const getQuizStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user email from AsyncStorage
      const email = await AsyncStorage.getItem('email');
      if (!email) {
        throw new Error('User email not found');
      }

      // For each quiz (1-5), fetch its status
      const quizStatuses = await Promise.all(
        Array.from({ length: 5 }, async (_, index) => {
          const quizId = index + 1;
          const response = await fetch(
            `http://10.0.2.2:3000/api/quiz/status/${quizId}/${email}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (!response.ok) {
            throw new Error('Failed to fetch quiz status');
          }

          const result = await response.json();
          return { quizId, status: result.status };
        })
      );

      // Store all statuses in AsyncStorage
      await AsyncStorage.setItem('quizStatuses', JSON.stringify(quizStatuses));
      
      // Update state with the statuses
      setStatus(JSON.stringify(quizStatuses));
      
    } catch (error) {
      console.error('Error fetching status:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Load quiz statuses when component mounts
  useEffect(() => {
    const loadQuizStatuses = async () => {
      try {
        // First try to get from AsyncStorage
        const savedStatuses = await AsyncStorage.getItem('quizStatuses');
        if (savedStatuses) {
          setStatus(savedStatuses);
        }
        // Then fetch fresh data from API
        await getQuizStatus();
      } catch (error) {
        console.error('Error loading quiz statuses:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      }
    };

    loadQuizStatuses();
  }, []);

  // Parse the status string to display it
  const renderQuizStatuses = () => {
    if (loading) {
      return <Text style={styles.text}>Loading quiz results...</Text>;
    }

    if (error) {
      return <Text style={[styles.text, styles.error]}>{error}</Text>;
    }

    try {
      const quizStatuses = JSON.parse(status || '[]');
      return (
        <>
          {quizStatuses.map((quiz: { quizId: number; status: string }) => (
            <View key={quiz.quizId} style={styles.quizStatus}>
              <Text style={styles.text}>
                Quiz {quiz.quizId}:{' '}
                <Text style={styles.highlight}>
                  {quiz.status === 'completed' ? 'completed' : 'not completed'}
                </Text>
              </Text>
            </View>
          ))}
        </>
      );
    } catch (error) {
      return <Text style={styles.text}>No quiz results available</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
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
        }} 
      />

      <ScrollView style={styles.content}>
        {renderQuizStatuses()}
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
    error: {
      color: 'red',
    },
    quizStatus: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
});