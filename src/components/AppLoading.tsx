import * as SplashScreen from 'expo-splash-screen'
import { FC, PropsWithChildren, useCallback, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import { AbsoluteFullFill, Loader, Center } from './atoms'

import { useAuth, useBoolean, useCachedResources, useFonts } from '~hooks'

SplashScreen.preventAutoHideAsync()

export const AppLoading: FC<PropsWithChildren> = ({ children }) => {
  const isLoadingComplete = useCachedResources()
  const [fontsLoaded, fontError] = useFonts({
    Lato_100Thin: require('../../assets/fonts/Lato_Thin.ttf'),
    Lato_300Light: require('../../assets/fonts/Lato_Light.ttf'),
    Lato_400Regular: require('../../assets/fonts/Lato_Regular.ttf'),
    Lato_700Bold: require('../../assets/fonts/Lato_Bold.ttf'),
    Lato_900Black: require('../../assets/fonts/Lato_Black.ttf'),
    IcoMoon: require('../../assets/icomoon/icomoon.ttf'),
  })

  // Delay loading logic was made to prevent displaying empty screen after splash screen will hide
  const [isDelayLoading, setIsDelayLoading] = useBoolean(true)
  const { isSignedIn } = useAuth()

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync()
      } catch (e) {
        console.warn(e)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    try {
      // Source: https://docs.expo.dev/versions/latest/sdk/splash-screen/#usage
      // This tells the splash screen to hide immediately! If we call this after
      // `prepare`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync()
      }
    } catch {
      console.log('There was some error while hiding splash screen')
    }
  }, [fontsLoaded, fontError])

  const isLoading = !isLoadingComplete || isSignedIn === null

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsDelayLoading.off()
      }, 200)
    }
  }, [isLoading, setIsDelayLoading])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {isLoading ? null : children}
      {isLoading || isDelayLoading ? (
        <AbsoluteFullFill bg="white">
          <Center flex={1}>
            <Loader type="bubbles" />
          </Center>
        </AbsoluteFullFill>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
