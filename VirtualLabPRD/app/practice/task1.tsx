import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { Platform, StatusBar as RNStatusBar } from 'react-native';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const Header = ({ title }: { title: string }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

interface QuizOptionProps {
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

interface QuestionCardProps {
  number: number;
  question: string;
  options: string[];
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuizOption: React.FC<QuizOptionProps> = ({ text, isSelected, onSelect }) => (
  <TouchableOpacity 
    style={[styles.optionContainer, isSelected && styles.selectedOption]}
    onPress={onSelect}
  >
    <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  number, 
  question, 
  options, 
  selectedOption,
  onSelectOption 
}) => (
  <View style={styles.questionCard}>
    <Text style={styles.questionNumber}>Question {number}</Text>
    <Text style={styles.questionText}>{question}</Text>
    {options.map((option: string, index: number) => (
      <QuizOption 
        key={index} 
        text={option}
        isSelected={selectedOption === index}
        onSelect={() => onSelectOption(index)}
      />
    ))}
  </View>
);

export default function Task1(): JSX.Element {
  const quizData: QuizQuestion[] = [
    {
      question: "What is the primary objective of engineering?",
      options: [
        "To study the world as it is",
        "To create a world that has never been",
        "To solve mathematical equations",
        "To replicate scientific experiments",
        "To analyze cultural differences"
      ],
      correctAnswer: 1
    },
    {
      question: "Which of the following is NOT included in the top 20 engineering achievements of the 20th century?",
      options: [
        "Electrification",
        "Airplane",
        "Artificial Intelligence",
        "Internet",
        "Health Technologies"
      ],
      correctAnswer: 2
    },
    {
      question: "According to the National Society of Professional Engineers (NSPE) Code of Ethics, engineers must prioritize which of the following in their duties?",
      options: [
        "Personal desires",
        "Public safety, health, and welfare",
        "Political ideologies",
        "Financial benefits",
        "Personal reputation"
      ],
      correctAnswer: 1
    },
    {
      question: "Which of the following best describes the term 'engineering' according to Kosky et al., 2010?",
      options: [
        "The study of human behavior",
        "The application of scientific principles to serve humanity",
        "The design of art and craft items",
        "The analysis of cultural traditions",
        "The application of business models in technology"
      ],
      correctAnswer: 1
    },
    {
      question: "What is one ethical responsibility of an engineer, as mentioned in the material?",
      options: [
        "Act for personal gains only",
        "Accept gifts that compromise professional integrity",
        "Perform services only in areas of their competence",
        "Avoid teamwork whenever possible",
        "Prioritize speed over accuracy"
      ],
      correctAnswer: 2
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(quizData.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const calculateScore = () => {
    return quizData.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleHomePress = async () => {
    setSelectedAnswers(new Array(quizData.length).fill(null));
    setShowResults(false);

    try {
      // Get email from AsyncStorage
      const userEmail = await AsyncStorage.getItem('email');
      
      if (!userEmail) {
          setErrorMessage('User email not found. Please login again.');
          return;
      }

      const response = await fetch('http://10.0.2.2:3000/api/quiz/status', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              quiz_id: 1, 
              status: 'completed',
              email: await AsyncStorage.getItem('email')
          }),
      });

      const result = await response.json();

      if (response.ok) {
          router.replace('/landing');
      } else {
          setErrorMessage(result.error || 'Failed to update quiz status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating quiz status:', error);
      setErrorMessage('An error occurred while updating quiz status. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
        headerShown: false  
        }}
      />

      <View style={styles.screen}>
        <Header title="Quiz 1" />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {quizData.map((item: QuizQuestion, index: number) => (
            <QuestionCard
              key={index}
              number={index + 1}
              question={item.question}
              options={item.options}
              selectedOption={selectedAnswers[index]}
              onSelectOption={(optionIndex) => handleSelectOption(index, optionIndex)}
            />
          ))}

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => setShowResults(true)}
          >
            <Text style={styles.submitButtonText}>Submit Quiz</Text>
          </TouchableOpacity>

          {showResults && (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsText}>
                Your Score: {calculateScore()} out of {quizData.length}
              </Text>
              <TouchableOpacity 
                style={styles.homeButton}
                onPress={handleHomePress}
              >
                <Text style={styles.homeButtonText}>Home</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1C4E9',
  },
  screen: {
    width: width,
    height: '100%',
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
  scrollViewContent: {
    padding: 16,
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 16,
  },
  optionContainer: {
    backgroundColor: '#5C6BC0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#3F51B5',
    borderWidth: 2,
    borderColor: '#1A237E',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  homeButton: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 8,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});