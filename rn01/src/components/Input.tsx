import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {}

export default function Input(props: Props) {
  return <TextInput {...props} />;
}
