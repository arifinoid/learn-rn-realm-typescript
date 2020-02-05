import React from 'react';
import {View, Alert, StyleSheet} from 'react-native';

import CustomTextInput from '../components/TextInput';
import Button from '../components/Button';
import Realm from 'realm';

export default class DeleteUser extends React.Component<
  {navigation: any},
  {userId: string}
> {
  public database: Realm;
  constructor(props: any) {
    super(props);
    this.database = new Realm({path: 'UserDatabase.realm'});
    this.state = {
      userId: '',
    };
  }

  public deleteUser = () => {
    const {userId} = this.state;
    const {navigation} = this.props;

    const userDetails = this.database.objects('userDetails');

    this.database.write(() => {
      if (userDetails.filtered(`userId=${userId}`).length > 0) {
        this.database.delete(userDetails.filtered(`userId=${userId}`));

        Alert.alert(
          'Success',
          'User deleted successfully',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('HomeScreen'),
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert('Please insert a valid User Id');
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <CustomTextInput
          placeholder="Enter User Id"
          onChangeText={userId => this.setState({userId})}
        />
        <Button title="Delete User" onPress={this.deleteUser.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', flex: 1},
});
