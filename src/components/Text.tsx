import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TextComponent: React.FC<{text: string}> = ({text}) => {
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: 18,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
});

export default TextComponent;
