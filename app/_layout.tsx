import { Stack } from "expo-router";
import './globals.css';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { Buffer } from 'buffer';

global.Buffer = global.Buffer || Buffer;

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{
        headerShown: false
      }}
    />

    <Stack.Screen
      name="movies/[id]"
      options={{
        headerShown: false
      }}
    />
  </Stack>;
}
