import React, { useState, useMemo } from 'react'
import { View, KeyboardAvoidingView, SafeAreaView, Platform } from 'react-native'
import {
  Typer,
  Toolbar,
  DocumentControlAction,
  buildVectorIconControlSpec,
  buildBridge,
  buildEmptyDocument,
} from '@typeskill/typer'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { soberTheme, ICON_SIZE, ICON_INACTIVE_COLOR, ICON_ACTIVE_COLOR, SPACING } from './styles'

function buildMaterialControlSpec(actionType: DocumentControlAction, name: string) {
  return buildVectorIconControlSpec(MaterialCommunityIcons as any, actionType, name)
}

const toolbarLayout: Toolbar.Layout = [
  buildMaterialControlSpec(DocumentControlAction.SELECT_TEXT_BOLD, 'format-bold'),
  buildMaterialControlSpec(DocumentControlAction.SELECT_TEXT_ITALIC, 'format-italic'),
  buildMaterialControlSpec(DocumentControlAction.SELECT_TEXT_UNDERLINE, 'format-underline'),
  buildMaterialControlSpec(DocumentControlAction.SELECT_TEXT_STRIKETHROUGH, 'format-strikethrough-variant'),
]

export function Editor() {
  const [document, setDocument] = useState(buildEmptyDocument())
  const bridge = useMemo(() => buildBridge(), [])
  return (
    <SafeAreaView style={soberTheme.rootContainer}>
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding' })} style={soberTheme.flex} enabled>
        <View style={soberTheme.typerContainer}>
          <Typer
            document={document}
            spacing={SPACING}
            onDocumentUpdate={setDocument}
            textStyle={soberTheme.textStyle}
            bridge={bridge}
            maxMediaBlockHeight={300}
          />
        </View>
        <Toolbar
          iconSize={ICON_SIZE}
          activeButtonColor={ICON_ACTIVE_COLOR}
          inactiveButtonColor={ICON_INACTIVE_COLOR}
          document={document}
          layout={toolbarLayout}
          contentContainerStyle={soberTheme.toolbarContainer}
          bridge={bridge}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
