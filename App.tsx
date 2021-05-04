import React from 'react';

import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { useFonts, Jost_400Regular, Jost_600SemiBold, Jost_700Bold} from '@expo-google-fonts/jost'
import { Routes } from './src/routes/Routes';


export default function App() {

  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
    Jost_700Bold,

    Poppins_400Regular,
    Poppins_700Bold
  })

  if(!fontsLoaded) return <AppLoading />

  return (
      <PaperProvider >
        <Routes />
        <StatusBar style="auto" />
      </PaperProvider>
  );  
}
