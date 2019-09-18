import React, { Component } from 'react'
import { View, KeyboardAvoidingView, SafeAreaView, PermissionsAndroid } from 'react-native'
import {
  Bridge,
  Typer,
  Toolbar,
  DocumentControlAction,
  buildVectorIconControlSpec,
  buildBridge,
  buildEmptyDocument,
  Document,
  Images,
  CONTROL_SEPARATOR,
} from 'react-native-typeskill'
import * as ImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { editorStyles, ICON_SIZE, ICON_INACTIVE_COLOR, ICON_ACTIVE_COLOR, SPACING } from './styles'
import { Version } from './Version'

interface State {
  document: Document
}

type ImageAction = 'TAKE_PICTURE' | 'SELECT_FROM_GALLERY'

interface ImageSource {
  uri: string
  name: string
}

function buildMaterialCommunityControlSpec(actionType: DocumentControlAction, name: string, options?: any) {
  return buildVectorIconControlSpec(MaterialCommunityIcons as any, actionType, name, options)
}

const toolbarLayout: Toolbar.Layout = [
  buildMaterialCommunityControlSpec(DocumentControlAction.SELECT_TEXT_BOLD, 'format-bold'),
  buildMaterialCommunityControlSpec(DocumentControlAction.SELECT_TEXT_ITALIC, 'format-italic'),
  buildMaterialCommunityControlSpec(DocumentControlAction.SELECT_TEXT_UNDERLINE, 'format-underline'),
  buildMaterialCommunityControlSpec(DocumentControlAction.SELECT_TEXT_STRIKETHROUGH, 'format-strikethrough-variant'),
  CONTROL_SEPARATOR,
  buildVectorIconControlSpec(MaterialIcons as any, DocumentControlAction.INSERT_IMAGE_AT_SELECTION, 'photo-library', {
    actionOptions: 'SELECT_FROM_GALLERY',
  }),
  buildMaterialCommunityControlSpec(DocumentControlAction.INSERT_IMAGE_AT_SELECTION, 'camera-image', {
    actionOptions: 'TAKE_PICTURE',
  }),
]

export class Editor extends Component<{}, State> {
  private bridge: Bridge<ImageSource>

  public state: State = {
    document: buildEmptyDocument(),
  }

  private pickOneImage = async (options: ImageAction) => {
    await PermissionsAndroid.request('android.permission.CAMERA')
    let response: ImagePicker.ImagePickerResult
    if (options === 'SELECT_FROM_GALLERY') {
      response = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images })
    } else {
      response = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images })
    }
    if (response.cancelled) {
      throw new Error('User cancelled.')
    }
    const description: Images.Description<ImageSource> = {
      source: {
        uri: response.uri,
        name: response.uri,
      },
      width: response.width,
      height: response.height,
    }
    return description
  }

  public constructor(props: {}) {
    super(props)
    this.bridge = buildBridge()
  }

  public handleOnDocumentUpdate = (document: Document) => {
    this.setState({ document })
  }

  public render() {
    return (
      <SafeAreaView style={editorStyles.rootContainer}>
        <KeyboardAvoidingView style={editorStyles.flex} enabled>
          <Version />
          <View style={editorStyles.typerContainer}>
            <Typer
              document={this.state.document}
              spacing={SPACING}
              onDocumentUpdate={this.handleOnDocumentUpdate}
              documentStyle={editorStyles.typerContent}
              textStyle={editorStyles.textStyle}
              bridge={this.bridge}
              maxMediaBlockHeight={300}
            />
          </View>
          <Toolbar
            iconSize={ICON_SIZE}
            activeButtonColor={ICON_ACTIVE_COLOR}
            inactiveButtonColor={ICON_INACTIVE_COLOR}
            separatorColor="transparent"
            document={this.state.document}
            layout={toolbarLayout}
            contentContainerStyle={editorStyles.toolbarContainer}
            bridge={this.bridge}
            pickOneImage={this.pickOneImage}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}
