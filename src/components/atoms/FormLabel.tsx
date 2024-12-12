import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Text } from './Text'
import { FormLabelProps } from './types'

import { useColorScheme } from '~contexts'
import { useTheme } from '~hooks'

export const FormLabel = ({ label, isRequired, labelStyle }: FormLabelProps) => {
  const { colors } = useTheme()
  const { colorScheme } = useColorScheme()
  const stylesForRequired =
    labelStyle &&
    Object.fromEntries(
      Object.entries(labelStyle).map(([key, value]) =>
        key === 'color' ? [key, 'red'] : [key, value]
      )
    )

  return (
    <View style={[styles.wrapper, { ...(label && styles.wrapperWithLabel) }]}>
      {label && (
        <Text
          style={[
            labelStyle,
            { color: labelStyle?.color || (colorScheme === 'light' ? colors.black : colors.white) },
          ]}
        >
          {label}
          {isRequired && <Text style={[stylesForRequired, { color: colors.red['500'] }]}>*</Text>}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  wrapperWithLabel: {
    marginBottom: 8,
    marginTop: 4,
  },
})
