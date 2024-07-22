/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#3498db',
    // accent: '#f1c40f',
  },
};

export default function Main() {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
      </GestureHandlerRootView>
    );
  }
  
AppRegistry.registerComponent(appName, () => Main);