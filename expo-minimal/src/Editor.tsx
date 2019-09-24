import React, { Component } from 'react'
import { View, KeyboardAvoidingView, SafeAreaView, Platform } from 'react-native'
import {
  Bridge,
  Typer,
  Toolbar,
  DocumentControlAction,
  buildVectorIconControlSpec,
  buildBridge,
  buildEmptyDocument,
  Document,
} from '@typeskill/typer'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { editorStyles, ICON_SIZE, ICON_INACTIVE_COLOR, ICON_ACTIVE_COLOR, SPACING } from './styles'

function buildMaterialControlSpec(actionType: DocumentControlAction, name: string) {
  return buildVectorIconControlSpec(MaterialCommunityIcons as any, actionType, name)
}

const toolbarLayout: Toolbar.Layout = [
  buildMaterialControlSpec(DocumentControlAction.SELECT_TEXT_BOLD, 'format-bold'),
  buildMaterialControlSpec(DocumentControlAction.SELECT_TEXT_ITALIC, 'format-italic'),
  buildMaterialControlSpec(DocumentControlAction.SELECT_TEXT_UNDERLINE, 'format-underline'),
  buildMaterialControlSpec(DocumentControlAction.SELECT_TEXT_STRIKETHROUGH, 'format-strikethrough-variant'),
]

interface State {
  document: Document
}

export class Editor extends Component<{}, State> {
  private bridge: Bridge<any> = buildBridge()

  public state: State = {
    document: buildEmptyDocument(),
  }

  public handleOnDocumentUpdate = (document: Document) => {
    this.setState({ document })
  }

  public render() {
    return (
      <SafeAreaView style={editorStyles.rootContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? undefined : 'padding'} style={editorStyles.flex} enabled>
          <View style={editorStyles.typerContainer}>
            <Typer
              document={this.state.document}
              spacing={SPACING}
              onDocumentUpdate={this.handleOnDocumentUpdate}
              documentStyle={editorStyles.typerContent}
              textStyle={editorStyles.textStyle}
              bridge={this.bridge}
            />
          </View>
          <Toolbar
            iconSize={ICON_SIZE}
            activeButtonColor={ICON_ACTIVE_COLOR}
            inactiveButtonColor={ICON_INACTIVE_COLOR}
            document={this.state.document}
            layout={toolbarLayout}
            contentContainerStyle={editorStyles.toolbarContainer}
            bridge={this.bridge}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}
