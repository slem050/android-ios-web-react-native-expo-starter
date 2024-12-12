import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { memo } from 'react'

import { bottomTabsScreensData } from './config/tabs'

import { Text, Icon } from '~components/atoms'
import { TAB_DEFAULT_ICON } from '~constants'
import { useCallback, useNavigationTheme } from '~hooks'

const { Navigator, Screen } = createBottomTabNavigator<MainTabParamList>()

type ScreenOptions = (params: BottomTabScreenProps) => BottomTabNavigationOptions

const navigatorScreens = bottomTabsScreensData.map((props) => {
  const Component = memo((): JSX.Element => {
    const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator()
    const screens = props.screens.map((props) => <StackScreen key={props.name} {...props} />)
    return <StackNavigator>{screens}</StackNavigator>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  return <Screen key={props.name} {...props} component={Component} />
})

export const BottomTabNavigator = () => {
  const { tabBarTheme } = useNavigationTheme()

  const screenOptions = useCallback<ScreenOptions>(
    ({ route }) => ({
      tabBarIcon: ({ color, size, focused }) => {
        const { active, inactive } =
          bottomTabsScreensData.find((screen) => screen.name === route.name)?.icons || {}
        const iconToRender = (focused ? active : inactive) || TAB_DEFAULT_ICON

        // CONFIG: You can return any component that you like here!
        return <Icon name={iconToRender} size={size} color={color as ColorNames} />
      },
      tabBarLabel: ({ color, focused }) => {
        const title =
          bottomTabsScreensData.find((screen) => screen.name === route.name)?.options?.title || ''

        // CONFIG: You can return any component that you like here!

        const TextComponent = focused ? Text.NavLabelBold : Text.NavLabel
        return <TextComponent color={color as ColorNames}>{title}</TextComponent>
      },
      headerShown: false,
      ...tabBarTheme,
    }),
    [tabBarTheme]
  )

  return <Navigator screenOptions={screenOptions}>{navigatorScreens}</Navigator>
}
