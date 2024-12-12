import { createRef, MutableRefObject } from 'react'

import { SignInFormValues, SignUpFormValues } from '~types/authForms'
import createGenericContext from '~utils/createGenericContext'

// TODO: modify return options from signIn, signOut, signUp and add sendPasswordResetEmail and confirmPasswordReset functions
export type AuthContextType = {
  isSignedIn: boolean | null
  signIn: (data: SignInFormValues) => void
  signOut: () => void
  signUp: (data: SignUpFormValues) => void
}

export const [useAuthContext, AuthContextProvider] =
  createGenericContext<AuthContextType>('AuthContext')

export const authContextRef: MutableRefObject<AuthContextType | null> = createRef()
