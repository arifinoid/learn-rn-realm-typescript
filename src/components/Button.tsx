import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

interface IProps {
  onPress: () => void;
  title: string;
}

const Button: React.FC<IProps> = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f05555',
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  text: {
    color: '#fff',
  },
});

export default Button;
