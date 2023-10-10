import React from 'react'
import { ApiContextProvider } from './assets/context/ApiContext'
import MainScreen from './assets/screen/MainScreen'
import { StatusBar } from 'react-native'

export default function App() {
  return (
    <ApiContextProvider>
      <StatusBar barStyle="dark-content" />
      <MainScreen />
    </ApiContextProvider>
  )
}
