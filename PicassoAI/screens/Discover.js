import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ImageData = [
    { id: '1', title: 'Hitler', image: 'https://img.freepik.com/premium-photo/adolf-hitler-portrait-picture_485374-2023.jpg?w=360' },
    { id: '2', title: 'Cartel Mexico', image: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/1cb83b24-73a1-401b-8492-a61b2917378c/81a8f20c-7de2-44fe-98af-f2d228b588ea.png' },
    { id: '3', title: 'Giorno Giovanna', image: 'https://cdn.talkie-ai.com/talkie-user-img/72455200313686/72915447419210-2.jpeg' },
    { id: '4', title: 'Time Machine', image: 'https://images.nightcafe.studio/jobs/VXbscPwblPBYivIaf7Tr/VXbscPwblPBYivIaf7Tr_2x.jpg?tr=w-1600,c-at_max' },
    { id: '5', title: 'Hashirama Dora', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRf6-GU9wl9o3k1m1hFE2mNPjj3BrmJYngHQ&s' },
    { id: '6', title: 'Tywin', image: 'https://images.nightcafe.studio/jobs/kpqNau7lB4nXjab5eSvS/kpqNau7lB4nXjab5eSvS--1--5r7dv.jpg?tr=w-1600,c-at_max' },
    { id: '7', title: 'Stranded astronaut', image: 'https://news.ubc.ca/wp-content/uploads/2023/08/AdobeStock_559145847.jpeg' },
    { id: '8', title: 'Disney princess', image: 'https://miro.medium.com/v2/resize:fit:1024/1*Chjg29obPzODEEexqz7pbw.jpeg' },
];


export default function Discover() {
    const [prompt, setPrompt] = useState('');
    const navigation = useNavigation();  // Access navigation
  
    const handleGenerateImage = () => {
      if (prompt) {
        navigation.navigate('GeneratedPicture', { prompt });  // Pass prompt as a param
      }
    };
  
    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.imageCard}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.imageTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <TextInput
            placeholder="Tell me what to imagine"
            style={styles.searchInput}
            value={prompt}
            onChangeText={setPrompt}  // Update prompt as user types
            />
            <TouchableOpacity onPress={handleGenerateImage} style={styles.generateButton}>
            <Image 
                source={require('./assets/search.png')} // Replace with your back icon
                style={styles.icon}
              />
            </TouchableOpacity>
        </View>
  
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButtonActive}>
            <Text style={styles.activeButtonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Creative</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Realistic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Sci-Fi</Text>
          </TouchableOpacity>
        </View>
  
        <FlatList
          data={ImageData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={styles.imageGrid}
          columnWrapperStyle={styles.row}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f1f0f1',
      paddingHorizontal: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor:"#f1f0f1"
    },
    searchInput: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
      paddingHorizontal:20,
      borderRadius:100,

      marginHorizontal: 10,
    },
    generateButton:{
        backgroundColor:"#000",
        marginRight: 10,
        padding: 10,
        borderRadius:100,
      paddingHorizontal:20,
      height:"100%",
    alignItems:"center",
    verticalAlign:"center"

    },
    generateButtonText:{
        color:"#fff",
        paddingVertical:"auto",
        fontSize:16
        
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      paddingHorizontal:10,
      backgroundColor:"#f1f0f1"
    },
    filterButton: {
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
      backgroundColor:"#eee",
      borderColor: '#000',
      borderWidth:2
    },
    filterButtonActive: {
        paddingVertical: 10,
        paddingHorizontal:20,
        backgroundColor: '#000',
        borderRadius: 20,
        color:'#fff',
        borderColor: '#000',
         borderWidth:2
      },
    activeButtonText: {
        color: '#fff', // Set the font color to white
        textAlign: 'center', // Optional: center the text
      },
    filterText: {
      fontSize: 14,
      fontWeight: '600',
    },
    imageGrid: {
      flex: 1,

    },
    row: {
      justifyContent: 'space-between',
    },
    imageCard: {
      flex: 1,
      margin: 5,
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 10,
    },
    imageTitle: {
      marginTop: 5,
      fontSize: 14,
      fontWeight: '500',
    },
    icon: {
        width: 24, // Set the width of your icon
        height: 24, // Set the height of your icon

      },
  });