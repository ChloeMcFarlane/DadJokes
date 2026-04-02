// File: my_styles.ts
// Author: (cmcfar)/cmcfar@bu.edu
// Description: This file defines the default home tab screen for the dadjokes app.

import { StyleSheet, StatusBar} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight,
    },
    listContainer: {
      flex: 1,
      paddingHorizontal: 20,
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
    },
    card: {
      backgroundColor: '#f9f9f9',
      padding: 15,
      marginBottom: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      alignItems: 'center'
    },
    jokeText: {
      fontSize: 18,
      marginBottom: 5,
    },
    img:{
      width: 200,
      height: 200,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    loadingContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '100%',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      marginBottom: 10,
    },
    input:{
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    errorContainer: {
      backgroundColor: '#f8d7da',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    errorText: {
      color: '#721c24',
      fontSize: 14,
    },
  });