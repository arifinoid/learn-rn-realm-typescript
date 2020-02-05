import React from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import Realm from 'realm';

import CustomTextInput from '../components/TextInput';
import Button from '../components/Button';

export default class ViewUser extends React.Component<
  {},
  {
    userData: any;
    userId: string;
  }
> {
  public database: Realm;
  constructor(props: any) {
    super(props);
    this.database = new Realm({path: 'UserDatabase.realm'});
  }

  public searchUser = () => {
    const {userId} = this.state;
    const userDetails = this.database
      .objects('userDetails')
      .filtered(`userId =${userId}`);

    if (userDetails.length > 0) {
      this.setState({
        userData: userDetails[0],
      });
    } else {
      Alert.alert('No user found');
      this.setState({
        userData: '',
      });
    }
  };

  public render() {
    const {userData} = this.state;

    return (
      <View>
        <CustomTextInput
          placeholder="Enter User Id"
          onChangeText={userId => this.setState({userId})}
        />
        <Button title="Search User" onPress={this.searchUser.bind(this)} />
        <View style={styles.innerContainer}>
          <Text>User Id: {userData.userId}</Text>
          <Text>User Name: {userData.userName}</Text>
          <Text>User Contact: {userData.userContact}</Text>
          <Text>User Address: {userData.userAddress}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {marginLeft: 35, marginRight: 35, marginTop: 10},
});
