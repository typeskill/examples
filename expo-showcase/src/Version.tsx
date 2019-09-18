import React from 'react'
import { View, Text } from 'react-native'
import { GUI_BORDER_COLOR, SPACING } from './styles'

const version = (require('../node_modules/@typeskill/typer/package.json') as any).version as string

export const Version = () => (
  <View>
    <Text
      style={{
        fontFamily: 'monospace',
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
