import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import Realm from 'realm';

export default class ViewAllUser extends React.Component<{}, {users: any}> {
  public database: Realm;
  constructor(props: any) {
    super(props);
    this.database = new Realm({path: 'UserDatabase.realm'});
    const userDetails = this.database.objects('userDetails');

    this.state = {
      users: userDetails,
    };
  }

  public ListViewItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  public render() {
    return (
      <View>
        <FlatList
          data={this.state.users}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}: any) => (
            <View style={styles.innerList}>
              <Text>Id: {item.user_id}</Text>
              <Text>Name: {item.user_name}</Text>
              <Text>Contact: {item.user_contact}</Text>
              <Text>Address: {item.user_address}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', flex: 1},
  separator: {height: 0.5, width: '100%', backgroundColor: '#000'},
  innerList: {backgroundColor: 'white', padding: 20},
});
