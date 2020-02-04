import React from 'react';
import {View, TextInput, StyleSheet, ReturnKeyTypeOptions} from 'react-native';

interface IProps {
  placeholder: string | undefined;
  keyboardType?: any;
  onChangeText: ((text: string) => void) | undefined;
  returnKeyType?: ReturnKeyTypeOptions;
  numberOfLines?: number | undefined;
  multiline?: boolean | undefined;
  onSubmitEditing?:
    | ((
        e: import('react-native').NativeSyntheticEvent<
          import('react-native').TextInputSubmitEditingEventData
        >,
      ) => void)
    | undefined;
  style?: any;
  value?: string;
  maxLength?: number;
}

const CustomTextInput: React.FC<IProps> = props => {
  return (
    <View style={styles.container}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#007FFF"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
        maxLength={props.maxLength}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    borderColor: '#007FFF',
    borderWidth: 1,
  },
});
export default CustomTextInput;
