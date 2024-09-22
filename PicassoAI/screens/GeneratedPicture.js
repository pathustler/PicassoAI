import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import BackButton from './BackButton';

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



export default function GeneratedPicture({ route }) {

  const { prompt } = route.params;  // Get the prompt passed from Discover
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
 // Function to generate image
 const generateImage = async () => {
  if (!prompt) return;

  setLoading(true);  // Set loading state to true when generation starts

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,  // Use the prompt from the route
      }),
    });

    // Check if the response is ok
    if (!response.ok) {
      console.error("Failed to generate image");
      return;
    }

    const result = await response.json();
    
    if (result && result.generated_image) {
      // Assuming the response includes base64 image data
      const base64Image = `data:image/png;base64,${result.generated_image}`;  // Adjust according to API response
      setGeneratedImage(base64Image);  // Set the generated image in base64 format
    } else {
      console.error("Generated image not found in the response");
    }

  } catch (error) {
    console.error("Error generating image: ", error.message || error);
  } finally {
    setLoading(false);  // Set loading state to false after the request finishes
  }
};
// Trigger the image generation when the component mounts
useEffect(() => {
  generateImage();
}, []);

  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
         <BackButton/>
          <TouchableOpacity >
              <Image 
                source={require('./assets/download.png')} // Replace with your back icon
                style={styles.icon}
              />
           </TouchableOpacity>
        </View>
  
       
        <View style={styles.imageContainer}>
        <Text style={styles.smallText}>Generated in 3.421s </Text>
        <Image 
              source={{ uri: generatedImage }}  // Use the dynamically generated image URL
              style={styles.image}
            />
              <Text style={styles.filterText}>{prompt}</Text>

          
        </View>
        <TouchableOpacity style={styles.againButton}>
            <Text style={styles.againButtonText}>Regenerate</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f1f0f1',

      paddingTop:40
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 10,
      paddingHorizontal:10,
      backgroundColor:"#f1f0f1",
      display:"flex",
      flexDirection:"row"
    },
    imageContainer: {


      alignItems:"center",
      marginVertical: 'auto',
      marginHorizontal: 'auto',
      
      backgroundColor:"#f1f0f1",
      height:500,
      width:100
    },
    imageCard: {
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
      backgroundColor:"#eee",
      borderColor: '#000',
      borderWidth:2,
      height:500,
      width:100
    },
    filterText: {
      fontSize: 30,
      fontWeight: '600',
      width:350,
      textAlign:"center",
      marginTop:20
    },
    smallText: {
      fontSize: 16,
      width:350,
      color:"#888",

      marginBottom:20
    },
    imageGrid: {
      flex: 1,

    },
    image: {
      width: 350,
      height: 350,
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
      marginRight:10
    },
    saveButton: {
      backgroundColor:"#000",
      marginVertical:20,
      marginHorizontal:20,
      borderRadius:100


    },
   saveButtonText:{
      color:"#fff",
      fontSize:22,
      paddingVertical:15,
      textAlign:"center",

      display:"flex",
      flexDirection:"row"
    },
    

    againButton: {
      borderWidth:3,
      borderColor:"#000",
      borderRadius:100,
      marginHorizontal:20,


    },
    againButtonText:{
      fontSize:22,
      paddingVertical:15,
      textAlign:"center",
      width:"100%",
      display:"flex",
      flexDirection:"row"
    }
  });