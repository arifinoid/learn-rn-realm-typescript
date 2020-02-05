import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './src/screens/Home';
import Register from './src/screens/Register';
import UpdateUser from './src/screens/UpdateUser';
import ViewUser from './src/screens/ViewUser';
import ViewAllUser from './src/screens/ViewAllUser';
import DeleteUser from './src/screens/DeleteUser';

const App = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {title: 'Home'},
  },
  View: {
    screen: ViewUser,
    navigationOptions: {title: 'View User'},
  },
  ViewAll: {
    screen: ViewAllUser,
    navigationOptions: {title: 'View All User'},
  },
  Update: {
    screen: UpdateUser,
    navigationOptions: {title: 'Update User'},
  },
  Register: {
    screen: Register,
    navigationOptions: {title: 'Register User'},
  },
  Delete: {
    screen: DeleteUser,
    navigationOptions: {title: 'Delete User'},
  },
});

export default createAppContainer(App);
