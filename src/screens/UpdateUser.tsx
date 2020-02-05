import React from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Realm from 'realm';

import CustomTextInput from '../components/TextInput';
import Button from '../components/Button';

export default class UpdateUser extends React.Component<
  {navigation: any},
  {
    userId: string;
    userName: string;
    userContact: string;
    userAddress: string;
  }
> {
  public database: Realm;
  constructor(props: any) {
    super(props);
    this.database = new Realm({path: 'UserDatabase.realm'});
    this.state = {
      userId: '',
      userName: '',
      userContact: '',
      userAddress: '',
    };
  }

  public searchUser = () => {
    const {userId} = this.state;
    const userDetails = this.database
      .objects('userDetails')
      .filtered(`userId=${userId}`);

    if (userDetails.length > 0) {
      this.setState({
        userName: userDetails[0].userName,
        userContact: userDetails[0].userContact,
        userAddress: userDetails[0].userAddress,
      });
    } else {
      Alert.alert('Whoops!!', 'No user found');
      this.setState({
        userName: '',
        userContact: '',
        userAddress: '',
      });
    }
  };

  public updateUser = () => {
    const that = this;
    const {userId, userName, userAddress, userContact} = this.state;

    if (userId) {
      if (userName) {
        if (userContact) {
          if (userAddress) {
            this.database.write(() => {
              const userDetails = this.database
                .objects('userDetails')
                .filtered(`userId=${userId}`);

              if (userDetails.length > 0) {
                userDetails[0].userName = userName;
                userDetails[0].userContact = userContact;
                userDetails[0].userAddress = userAddress;

                Alert.alert(
                  'Success',
                  'User updated successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () =>
                        that.props.navigation.navigate('HomeScreen'),
                    },
                  ],
                  {cancelable: false},
                );
              } else {
                Alert.alert('User Updation Failed');
              }
            });
          } else {
            Alert.alert('Please fill Address');
          }
        } else {
          Alert.alert('Please fill Contact Number');
        }
      } else {
        Alert.alert('Please fill Name');
      }
    } else {
      Alert.alert('Please fill User Id');
    }
  };

  public render() {
    const {userName, userContact, userAddress} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.kav}>
            <CustomTextInput
              onChangeText={userId => this.setState({userId})}
              placeholder="Enter User Id"
            />
            <Button title="Search User" onPress={this.searchUser.bind(this)} />

            <CustomTextInput
              onChangeText={userName => this.setState({userName})}
              placeholder="Enter Username"
              value={userName}
            />
            <CustomTextInput
              onChangeText={userContact => this.setState({userContact})}
              placeholder="Enter Contact Number"
              maxLength={10}
              keyboardType="numeric"
              value={userContact}
            />
            <CustomTextInput
              onChangeText={userAddress => this.setState({userAddress})}
              placeholder="Enter Address"
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{textAlignVertical: 'top'}}
              value={userAddress}
            />
            <Button title="Update User" onPress={this.updateUser.bind(this)} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', flex: 1},
  kav: {flex: 1, justifyContent: 'space-between'},
});
