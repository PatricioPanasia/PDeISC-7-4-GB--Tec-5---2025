import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

interface Props extends TextInputProps {
  error?: boolean;
}

export default function Input(props: Props) {
  return (
    <TextInput
      style={[
        styles.input,
        props.style,
        props.error && styles.inputError
      ]}
      placeholderTextColor="rgba(255,255,255,0.6)"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'transparent',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4444',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
  },
});