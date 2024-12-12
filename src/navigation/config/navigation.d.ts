import { NavigatorScreenParams } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { BottomTabScreenProps as BaseBottomTabScreenProps } from '@react-navigation/bottom-tabs'

declare global {
  // PARAMS
  type HomeStackParamList = {
    Home: undefined
    Details: { id: string }
  }

  type ExamplesStackParamList = {
    TestForm: undefined
    Examples: undefined
    Components: undefined
    Colors: undefined
    Typography: undefined
    DataFromBeScreen_EXAMPLE: undefined
  }

  type SettingsStackParamList = {
    Settings: undefined
  }

  type MainTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>
    ExamplesStack: NavigatorScreenParams<ExamplesStackParamList>
    SettingsStack: NavigatorScreenParams<SettingsStackParamList>
    // MainTabParamList END
  }

  type WebTabParamList = ExamplesStackParamList & HomeStackParamList & SettingsStackParamList
  // WebTabParamListEnd

  type RootStackParamList = {
    // Root_unauthorized
    SignUp: undefined
    SignIn: undefined

    // Root_authorized
    MainTab: NavigatorScreenParams<MainTabParamList>

    // Root_modals
    ApplicationInfo: undefined
    NotFound: undefined
  }

  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }

  // SCREENS - specific screens props
  // You can get navigation or route prop for every screen f. eg.
  // - HomeScreenNavigationProps['route']
  // - HomeScreenNavigationProps['navigation']

  type BottomTabScreenProps = BaseBottomTabScreenProps<
    MainTabParamList,
    'ExamplesStack' | 'HomeStack' | 'SettingsStack'
    // BottomTabScreenProps END
  >

  // root_stack
  type RootStackScreenProps = ScreenComposite

  // RootStack_SCREENS

  // HomeStack_SCREENS
  type HomeScreenProps = ScreenComposite<'Home'>
  type DetailsScreenProps = ScreenComposite<'Details'>

  // ExamplesStack_SCREENS
  type TestFormScreenProps = ScreenComposite<'TestForm'>
  type ExamplesScreenProps = ScreenComposite<'Examples'>
  type ComponentsScreenProps = ScreenComposite<'Components'>

  // SettingsStack_SCREENS
  type SettingsScreenProps = ScreenComposite<'Settings'>
}

// type ScreenHehe = ScreenComponent

// Helper types
type ScreenComposite<
  S extends keyof (RootStackParamList &
    HomeStackParamList &
    ExamplesStackParamList) = keyof RootStackParamList
> = StackScreenProps<RootStackParamList & HomeStackParamList & ExamplesStackParamList, S>
