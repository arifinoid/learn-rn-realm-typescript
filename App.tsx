import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './src/screens/Home';
import Register from './src/screens/Register';

const App = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'HomeScreen',
      headerStyle: {backgroundColor: '#3a59b7'},
      headerTintColor: '#fff',
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: 'Register User',
      headerStyle: {backgroundColor: '#3a59b7'},
      headerTintColor: '#fff',
    },
  },
});

export default createAppContainer(App);
