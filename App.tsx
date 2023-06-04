import * as React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Switch,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Card} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const [selectedValue, setSelectedValue] = useState('Select A Joke Type');
  const [jokeTextSetup, setJokeTextSetup] = useState('');
  const [jokeTextDelivery, setJokeTextDelivery] = useState('');

  const isDarkMode = useColorScheme() === 'dark';

  if (selectedValue == 'Random') {
    getJoke('Any');
    setSelectedValue('Select A Joke Type');
  } else if (selectedValue == 'Dark') {
    getJoke('Dark');
    setSelectedValue('Select A Joke Type');
  } else if (selectedValue == 'Pun') {
    getJoke('Pun');
    setSelectedValue('Select A Joke Type');
  }

  async function getJoke(type: string) {
    const url = 'https://jokeapi-v2.p.rapidapi.com/joke/' + type;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ead83bbce6msh4c701b709858c93p1524fejsn40aad91f9b74',
        'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);

      var msgs = JSON.parse(result);

      if (msgs.type == 'single') {
        setJokeTextSetup(msgs.joke);
        setJokeTextDelivery('');
      } else {
        setJokeTextSetup(msgs.setup);
        setJokeTextDelivery(msgs.delivery);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View
      style={[
        {
          backgroundColor: isDarkMode ? Colors.dark : Colors.light,
          flex: 1,
          justifyContent: 'center',
        },
      ]}>
      <Card
        title="Joke"
        containerStyle={{
          // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          borderRadius: 15,
        }}
        wrapperStyle={{
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          paddingTop: 10,
          margin: -18,
          borderRadius: 15,
        }}>
        <Picker
          selectedValue={selectedValue}
          style={{
            height: 50,
            width: 150,
            alignSelf: 'center',
            margin: 10,
            backgroundColor: 'lightgray',
            minWidth: 300,
            textAlign: 'center',
          }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="Select Joke Type" value="Select Joke Type" />
          <Picker.Item label="Random" value="Random" />
          <Picker.Item label="Dark" value="Dark" />
          <Picker.Item label="Pun" value="Pun" />
        </Picker>

        <Text
          style={{
            width: 300,
            textAlign: 'left',
            marginLeft: 17,
            fontWeight: 'bold',
            color: isDarkMode ? Colors.white : Colors.black,
          }}>
          {jokeTextSetup}
        </Text>
        <Text
          style={{
            width: 300,
            margin: 17,
            color: isDarkMode ? Colors.white : Colors.black,
          }}>
          {jokeTextDelivery}
        </Text>
      </Card>
    </View>
  );
}

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: isDarkMode ? Colors.darker : Colors.lighter,
          background: isDarkMode ? Colors.darker : Colors.lighter,
          card: isDarkMode ? Colors.darker : Colors.lighter,
          text: isDarkMode ? Colors.white : Colors.black,
          border: isDarkMode ? Colors.darker : Colors.lighter,
          notification: isDarkMode ? Colors.darker : Colors.lighter,
        },
      }}>
      <Tab.Navigator
        screenOptions={{
          tabBarBackground() {
            return (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 50,
                  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
                }}
              />
            );
          },
          tabBarActiveTintColor: 'lightblue',
          tabBarLabelStyle: {fontSize: 12},
        }}
        initialRouteName="Home">
        <Tab.Screen
          name="Super Jokes"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
