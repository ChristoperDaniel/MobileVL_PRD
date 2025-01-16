import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from "react-native";

const { width } = Dimensions.get('window');

export default function Quizresults() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Keeping the same API functions
  const getQuizStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      const email = await AsyncStorage.getItem('email');
      if (!email) {
        throw new Error('User email not found');
      }

      const quizStatuses = await Promise.all(
        Array.from({ length: 5 }, async (_, index) => {
          const quizId = index + 1;
          const response = await fetch(
            `https://backendedulab.vercel.app/api/quiz/status/${quizId}/${email}`,
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

      await AsyncStorage.setItem('quizStatuses', JSON.stringify(quizStatuses));
      setStatus(JSON.stringify(quizStatuses));
      
    } catch (error) {
      console.error('Error fetching status:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadQuizStatuses = async () => {
      try {
        const savedStatuses = await AsyncStorage.getItem('quizStatuses');
        if (savedStatuses) {
          setStatus(savedStatuses);
        }
        await getQuizStatus();
      } catch (error) {
        console.error('Error loading quiz statuses:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      }
    };

    loadQuizStatuses();
  }, []);

  const renderQuizStatuses = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5C63D8" />
          <Text style={styles.loadingText}>Loading your progress...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorSubtext}>Please try again later</Text>
        </View>
      );
    }

    try {
      const quizStatuses = JSON.parse(status || '[]');
      return (
        <View style={styles.resultsContainer}>
          <Text style={styles.headerText}>Your Progress</Text>
          {quizStatuses.map((quiz: { quizId: number; status: string }) => (
            <View 
              key={quiz.quizId} 
              style={[
                styles.quizCard,
                quiz.status === 'completed' && styles.completedCard
              ]}
            >
              <View style={styles.quizContent}>
                <View style={styles.quizHeader}>
                  <Text style={styles.quizTitle}>Quiz {quiz.quizId}</Text>
                  <View 
                    style={[
                      styles.statusBadge,
                      quiz.status === 'completed' ? styles.completedBadge : styles.pendingBadge
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {quiz.status === 'completed' ? 'Completed' : 'Not Completed'}
                    </Text>
                  </View>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill,
                      { width: quiz.status === 'completed' ? '100%' : '0%' }
                    ]} 
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    } catch (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No quiz results available</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerTitle: "Quiz Results",
          headerStyle: {
            backgroundColor: '#D1C4E9',
          },
          headerTitleStyle: {
            color: '#5C63D8',
            fontSize: 24,
            fontWeight: '700',
          },
          headerShadowVisible: false,
          headerTintColor: '#5C63D8',
          headerBackVisible: true,
        }} 
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderQuizStatuses()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1C4E9',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF4444',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  resultsContainer: {
    width: '100%',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#5C63D8',
    marginBottom: 24,
  },
  quizCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  completedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  quizContent: {
    gap: 12,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A2D4E',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  completedBadge: {
    backgroundColor: '#E8F5E9',
  },
  pendingBadge: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
});