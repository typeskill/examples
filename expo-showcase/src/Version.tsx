import React from 'react'
import { View, Text, Platform } from 'react-native'
import { GUI_BORDER_COLOR, SPACING } from './retro-funk-theme'

const version = (require('../node_modules/@typeskill/typer/package.json') as any).version as string

export const Version = () => (
  <View>
    <Text
      style={{
        fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
        fontWeight: 'bold',
        fontSize: 8,
        paddingTop: SPACING,
        textAlign: 'center',
        color: GUI_BORDER_COLOR,
      }}
    >
      @typeskill/typer@{version}
    </Text>
  </View>
)
