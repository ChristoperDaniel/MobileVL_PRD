import React, { useState } from 'react';
import { Stack } from 'expo-router';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import WebView from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function Module1() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const originalUrl = 'https://drive.google.com/file/d/1yITbm257ATVKVZpzy8MZDVXBjKMuBuFS/view?usp=sharing';
  const fileId = originalUrl.match(/\/d\/(.*?)\//)![1];
  const pdfUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  const downloadPDF = async () => {
    try {
      setIsDownloading(true);
      
      const downloadResumable = FileSystem.createDownloadResumable(
        pdfUrl,
        FileSystem.documentDirectory + 'Module4.pdf',
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          console.log(progress);
        }
      );
  
      const result = await downloadResumable.downloadAsync();
      
      if (result?.uri) {
        await Sharing.shareAsync(result.uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Save PDF'
        });
      }
  
      setIsDownloading(false);
      
    } catch (error) {
      setIsDownloading(false);
      Alert.alert('Error', 'Failed to download PDF');
      console.error('Download error:', error);
    }
  };

  const injectedJavaScript = `
    document.querySelector('meta[name="viewport"]').setAttribute('content', 
    'width=device-width, initial-scale=1.0, maximum-scale=4.0, user-scalable=1');
    true;
  `;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerTitle: "Engineering Design Process Problem Definition & Gathering Information",
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
      
      <View style={styles.pdfContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#5C63D8" />
            <Text style={styles.loadingText}>Loading PDF...</Text>
          </View>
        )}
        
        <WebView
          source={{ uri: previewUrl }}
          style={styles.pdf}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          injectedJavaScript={injectedJavaScript}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          bounces={true}
          scrollEnabled={true}
          pinchGestureEnabled={true}
          allowsInlineMediaPlayback={true}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          startInLoadingState={false}
          androidLayerType={Platform.OS === 'android' ? 'hardware' : undefined}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        />
      </View>

      <TouchableOpacity 
        style={[styles.downloadButton, isDownloading && styles.downloadButtonDisabled]} 
        onPress={downloadPDF}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            <Ionicons name="download-outline" size={24} color="white" />
            <Text style={styles.downloadButtonText}>Download PDF</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1C4E9',
  },
  pdfContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
    backgroundColor: '#ffffff',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#5C63D8',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5C63D8',
    padding: 12,
    margin: 10,
    borderRadius: 8,
    gap: 8,
  },
  downloadButtonDisabled: {
    backgroundColor: '#9FA0BC',
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});