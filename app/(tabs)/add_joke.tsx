// File: app/(tabs)/add_joke.tsx
// Author: (cmcfar)/cmcfar@bu.edu
// Description: This file defines the tab screen for add_joke.

// Self-imports
import React, { useState, useEffect } from 'react';
import { StatusBar, View, Image, Text, ActivityIndicator, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../assets/my_styles';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Separators } from 'react-native/types_generated/index';

export default function AddJokeScreen() {
    // Definitions
const [isLoading, setIsLoading] = useState(false);
const [refreshing, setRefreshing] = useState(false);
const [joke, setJoke] = useState([]);
const [picture, setPicture] = useState([]);
const [error, setError] = useState(''); 
const [postCont, setPostCont] = useState('');
const [postBody, setPostBody] = useState('');
const [isPosting, setIsPosting] = useState(false);

// add post function
const addPost = async () => {
  setIsPosting(true);
  try{
    const response = await fetch('http://10.239.28.77:8000/dadjokes/api/jokes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: postCont,
        text: postBody,
      }),
    });
    const newPost = await response.json();
    // setPostList([newPost, ...postList]);
    setPostCont('');
    setPostBody('');
    setIsPosting(false);
  } catch (error){
    console.error('Error creating post:', error);
    setIsPosting(false);
    setError('Failed to add new post');
    return;
  }
};

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
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Contributor" value={postCont} onChangeText={setPostCont}/>
            <TextInput style={styles.input} placeholder="Joke" value={postBody} onChangeText={setPostBody}/>
            <Button title={isPosting ? "Posting..." : "Create Post"} 
            onPress={addPost} 
            disabled={isPosting}/>
        </View>
    </SafeAreaView>
  );
}