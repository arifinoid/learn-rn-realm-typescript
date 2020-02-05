import React from 'react';
import Realm from 'realm';
import {View, StyleSheet} from 'react-native';

import TextComponent from '../components/Text';
import Button from '../components/Button';

export default class Home extends React.Component<{
  navigation: any;
}> {
  public database: Realm;
  constructor(props: any) {
    super(props);
    this.database = new Realm({
      path: 'UserDatabase.realm',
      schema: [
        {
          name: 'userDetails',
          properties: {
            userId: {type: 'int', default: 0},
            userName: 'string',
            userContact: 'string',
            userAddress: 'string',
          },
        },
      ],
    });
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <TextComponent text="Realm example" />
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
        <Button title="Update" onPress={() => navigation.navigate('Update')} />
        <Button title="View" onPress={() => navigation.navigate('View')} />
        <Button
          title="View All"
          onPress={() => navigation.navigate('ViewAll')}
        />
        <Button title="Delete" onPress={() => navigation.navigate('Delete')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
