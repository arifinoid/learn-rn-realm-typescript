import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Realm from 'realm';

import CustomTextInput from '../components/TextInput';
import Button from '../components/button';

export default class Register extends React.Component<
  {navigation: any},
  {
    userName: string;
    userContact: string;
    userAddress: string;
  }
> {
  public database: Realm;
  constructor(props: any) {
    super(props);
    this.state = {
      userName: '',
      userContact: '',
      userAddress: '',
    };

    this.database = new Realm({path: 'UserDatabase.realm'});
  }

  public registerUser = () => {
    let that = this;
    const {userName, userContact, userAddress} = this.state;
    if (userName) {
      if (userContact) {
        if (userAddress) {
          this.database.write(() => {
            const userId = this.database
              .objects('userDetails')
              .sorted('userId', true);

            let id = userId.length > 0 ? userId[0] : 1;

            this.database.create('userDetails', {
              userId: id,
              userName: that.state.userName,
              userContact: that.state.userContact,
              userAddress: that.state.userAddress,
            });
            Alert.alert(
              'Success',
              'You are registered successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
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
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.kav}>
            <CustomTextInput
              placeholder="Enter Name"
              onChangeText={userName => this.setState({userName})}
            />
            <CustomTextInput
              placeholder="Enter Contact Number"
              onChangeText={userContact => this.setState({userContact})}
              maxLength={10}
              keyboardType="numeric"
            />
            <CustomTextInput
              placeholder="Enter Address"
              onChangeText={userAddress => this.setState({userAddress})}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{textAlignVertical: 'top'}}
            />
            <Button title="Submit" customClick={this.registerUser.bind(this)} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  kav: {flex: 1, justifyContent: 'space-between'},
});
