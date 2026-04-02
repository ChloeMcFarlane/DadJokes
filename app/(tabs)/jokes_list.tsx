// File: app/(tabs)/jokes_list.tsx
// Author: (cmcfar)/cmcfar@bu.edu
// Description: This file displays a list of all the jokes.

// Self-imports
import React, { useState, useEffect } from 'react';
import { StatusBar, View, Image, Text, ActivityIndicator, TextInput, Button, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../assets/my_styles';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Separators } from 'react-native/types_generated/index';

export default function JokeListScreen() {
    // Definitions
const [isLoading, setIsLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
const [joke, setJoke] = useState([]);
const [error, setError] = useState(''); 
const [postTitle, setPostTitle] = useState('');
const [postBody, setPostBody] = useState('');

// data
const fetchData = async (limit = 10) => {
  try{
    // Fetch joke
    const response = await fetch(
      `http://10.239.28.77:8000/dadjokes/api/jokes`
    );
    const data = await response.json();
    setJoke(data);
    console.log(data)

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
        <FlatList
          data={joke.results}
          keyExtractor={(joke) => joke.id.toString()}
          refreshing={refreshing}
            onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.jokeText}>{item.text}</Text>
            </View>
          )}
        />
        </View>

    </SafeAreaView>
  );
}
