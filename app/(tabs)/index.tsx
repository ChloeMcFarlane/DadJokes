// File: app/(tabs)/index.tsx
// Author: (cmcfar)/cmcfar@bu.edu
// Description: This file defines the default home tab screen for the dadjokes app.

// Self-imports
import React, { useState, useEffect } from 'react';
import { StatusBar, View, Image, Text, ActivityIndicator, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../assets/my_styles';

import EditScreenInfo from '@/components/EditScreenInfo';




export default function IndexScreen() {
  // Definitions
const [isLoading, setIsLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
const [joke, setJoke] = useState([]);
const [picture, setPicture] = useState([]);
const [error, setError] = useState(''); 
const [postTitle, setPostTitle] = useState('');
const [postBody, setPostBody] = useState('');

// data
const fetchData = async (limit = 10) => {
  try{
    // Fetch joke
    const response = await fetch(
      `http://10.239.28.77:8000/dadjokes/api/random`
    );
    const data = await response.json();
    setJoke(data);

    // Fetch picture
    const picResponse = await fetch(
      `http://10.239.28.77:8000/dadjokes/api/random_picture`
    );
    const picData = await picResponse.json();
    setPicture(picData);

    setIsLoading(false);
    setError('')
  }catch(error){
    console.error('Error fetching posts:', error);
    setIsLoading(false);
    setError('Failed to load posts. Please try again later.');
  }
};

// useEffect for fetching data on component mount
useEffect(() => {
  fetchData();
}, []);

// Loading state
if (isLoading) {
  return (
      <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fabaad" />
          <Text> Loading.... </Text>
      </SafeAreaView>
  )

}

// Refresh
const handleRefresh = async () => {
  setRefreshing(true);
  await fetchData(20)
  setRefreshing(false);
}

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      <View style={styles.listContainer}>
            <View style={styles.card}>
              <Text style={styles.jokeText}>{joke.text}</Text>
              <Text style={styles.jokeCont}>{joke.contributor}</Text>
              <Image style={styles.img}source={{uri: picture.image_url}}/>
            </View>
      </View>
    </SafeAreaView>
  );
}
