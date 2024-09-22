import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Discover from './screens/Discover';
import GeneratedPicture from './screens/GeneratedPicture';



const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
       initialRouteName="Discover"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f1f0f1', // Set your desired color here

          }
        }}
      >
        <Stack.Screen name="Discover" component={Discover} options={{ title: 'PicassoAI', backgroundColor:"#f1f0f1" }} />
        <Stack.Screen name="GeneratedPicture" component={GeneratedPicture} options={{ headerShown: false }}   />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
