import { useMemo, memo, forwardRef, PropsWithoutRef, RefAttributes } from 'react'
import { TextProps as BaseTextProps, Text as BaseText, TextStyle } from 'react-native'

import { generateStyledComponent, generateStyleSheet } from '../../utils'
import { StyledProps } from '../types'

import { textVariants } from '~constants/textVariants'
import { useTheme } from '~hooks'
import { getColorValue, convertEmToNumber } from '~utils'

type TypographyProps = {
  fontSize?: FontSizes | number
  letterSpacing?: LetterSpacings
  lineHeight?: LineHeights
  fontWeight?: FontWeights
  fontFamily?: Fonts
  color?: ColorNames
  noOfLines?: number
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  textDecoration?: 'none' | 'underline' | 'line-through' | 'underline line-through'
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikeThrough?: boolean
  capitalize?: boolean
  uppercase?: boolean
  lowercase?: boolean
  variant?: TextVariant
}
type TextProps = StyledProps & BaseTextProps & TypographyProps

const RawText = memo(
  forwardRef<BaseText, TextProps>(
    (
      {
        bold,
        capitalize,
        color = 'text',
        italic,
        letterSpacing,
        lineHeight,
        noOfLines,
        strikeThrough,
        textDecoration,
        textTransform,
        underline,
        uppercase,
        lowercase,
        style,
        variant,
        ...props
      },
      ref
    ) => {
      const theme = useTheme()
      const { fontFamily: variantFontFamily, fontSize: variantFontSize } =
        (variant && textVariants[variant]) || {}

      const fontFamily = props.fontFamily || variantFontFamily
      const fontSize = props.fontSize || variantFontSize
      const finalFontSize = fontSize
        ? typeof fontSize === 'number'
          ? fontSize
          : theme.fontSizes[fontSize]
        : undefined

      const lineHeightStyle = useMemo<TextStyle>(
        () => ({
          lineHeight: lineHeight
            ? convertEmToNumber(theme.lineHeights[lineHeight], finalFontSize)
            : undefined,
        }),
        [theme, lineHeight, finalFontSize]
      )

      const letterSpacingStyle = useMemo<TextStyle>(
        () => ({
          letterSpacing: letterSpacing
            ? convertEmToNumber(theme.letterSpacings[letterSpacing], finalFontSize)
            : undefined,
        }),
        [theme, letterSpacing, finalFontSize]
      )

      const textColor = useMemo<TextStyle>(
        () => ({
          color: color ? getColorValue({ color, colors: theme.colors }) : theme.colors.text,
        }),
        [theme, color]
      )

      const textAlignmentStyle = useMemo<TextStyle>(
        () => ({
          textAlign: props.textAlign,
        }),
        [props.textAlign]
      )

      const textTransformStyle = useMemo<TextStyle>(
        () => ({
          textTransform:
            capitalize || textTransform === 'capitalize'
              ? 'capitalize'
              : lowercase || textTransform === 'lowercase'
              ? 'lowercase'
              : uppercase || textTransform === 'uppercase'
              ? 'uppercase'
              : 'none',
        }),
        [capitalize, lowercase, uppercase, textTransform]
      )

      const textDecorationStyle = useMemo<TextStyle>(
        () => ({
          textDecorationLine:
            underline || textDecoration === 'underline'
              ? 'underline'
              : strikeThrough || textDecoration === 'line-through'
              ? 'line-through'
              : undefined,
        }),
        [underline, strikeThrough, textDecoration]
      )

      const fontFamilyStyle = useMemo<TextStyle>(
        () => ({
          fontFamily: fontFamily ? theme.fonts[fontFamily] : undefined,
        }),
        [theme, fontFamily]
      )

      const fontSizeStyle = useMemo<TextStyle>(
        () => ({
          fontSize: finalFontSize,
        }),
        [finalFontSize]
      )

      const textStyle = useMemo(
        () =>
          generateStyleSheet<TextStyle>([
            bold && { fontWeight: 'bold' },
            italic && { fontStyle: 'italic' },
            fontFamilyStyle,
            fontSizeStyle,
            textAlignmentStyle,
            textColor,
            textDecorationStyle,
            letterSpacingStyle,
            lineHeightStyle,
            textTransformStyle,
            style,
          ]),
        [
          bold,
          italic,
          fontFamilyStyle,
          fontSizeStyle,
          textAlignmentStyle,
          letterSpacingStyle,
          lineHeightStyle,
          textColor,
          textDecorationStyle,
          textTransformStyle,
          style,
        ]
      )

      return (
        <BaseText
          ref={ref}
          testID="baseText"
          numberOfLines={noOfLines}
          {...props}
          style={textStyle}
        />
      )
    }
  )
)

export type TextVariant =
  | 'H1'
  | 'H1Bold'
  | 'H2'
  | 'H2Bold'
  | 'H3'
  | 'H3Bold'
  | 'H4'
  | 'H4Bold'
  | 'H5'
  | 'H5Bold'
  | 'H6'
  | 'H6Bold'
  | 'Body'
  | 'BodyBold'
  | 'Caption'
  | 'CaptionBold'
  | 'Subtitle'
  | 'SubtitleBold'
  | 'NavLabel'
  | 'NavLabelBold'
type TextComposition = React.ForwardRefExoticComponent<
  PropsWithoutRef<TextProps> & RefAttributes<BaseText>
> & {
  [key in TextVariant]: React.ForwardRefExoticComponent<
    PropsWithoutRef<TextProps> & RefAttributes<BaseText>
  >
}

const Text = generateStyledComponent(RawText) as TextComposition
const generateTextVariant = (variant: TextVariant) =>
  forwardRef<BaseText, TextProps>((props, ref) => <Text variant={variant} {...props} ref={ref} />)

Text.H1 = generateTextVariant('H1')
Text.H1Bold = generateTextVariant('H1Bold')
Text.H2 = generateTextVariant('H2')
Text.H2Bold = generateTextVariant('H2Bold')
Text.H3 = generateTextVariant('H3')
Text.H3Bold = generateTextVariant('H3Bold')
Text.H4 = generateTextVariant('H4')
Text.H4Bold = generateTextVariant('H4Bold')
Text.H5 = generateTextVariant('H5')
Text.H5Bold = generateTextVariant('H5Bold')
Text.H6 = generateTextVariant('H6')
Text.H6Bold = generateTextVariant('H6Bold')
Text.Body = generateTextVariant('Body')
Text.BodyBold = generateTextVariant('BodyBold')
Text.Caption = generateTextVariant('Caption')
Text.CaptionBold = generateTextVariant('CaptionBold')
Text.Subtitle = generateTextVariant('Subtitle')
Text.SubtitleBold = generateTextVariant('SubtitleBold')
Text.NavLabel = generateTextVariant('NavLabel')
Text.NavLabelBold = generateTextVariant('NavLabelBold')

export { Text }
