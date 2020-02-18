import React from 'react'
import { View, KeyboardAvoidingView, SafeAreaView, Platform } from 'react-native'
import {
  Typer,
  Toolbar,
  DocumentControlAction,
  buildVectorIconControlSpec,
  Document,
  Images,
  CONTROL_SEPARATOR,
  useBridge,
  useDocument
} from '@typeskill/typer'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { theme, ICON_SIZE, ICON_INACTIVE_COLOR, ICON_ACTIVE_COLOR, SPACING } from './retro-funk-theme' // './sober-theme'
import { Version } from './Version'
import { PermissionStatus } from 'expo-permissions'

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

async function askCameraPermission() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA)
  if (status !== PermissionStatus.GRANTED) {
    throw new Error(`Missing Camera permission. Status is: ${status}`)
  }
}

async function askCameraRollPermission() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
  if (status !== PermissionStatus.GRANTED) {
    throw new Error(`Missing Camera Roll permission. Status is: ${status}`)
  }
}

async function pickOneImage (options?: ImageAction) {
  let response: ImagePicker.ImagePickerResult
  if (options === 'SELECT_FROM_GALLERY') {
    if (Platform.OS === 'ios') {
      await askCameraRollPermission()
    }
    response = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images })
  } else {
    await askCameraPermission()
    await askCameraRollPermission()
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

export function Editor() {
  const [document, setDocument] = useDocument()
  const bridge = useBridge<ImageSource>()
  return (
    <SafeAreaView style={theme.rootContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? undefined : 'padding'} style={theme.flex} enabled>
        <Version />
        <View style={theme.typerContainer}>
          <Typer
            document={document}
            spacing={SPACING}
            onDocumentUpdate={setDocument}
            textStyle={theme.textStyle}
            bridge={bridge}
            maxMediaBlockHeight={300}
          />
        </View>
        <Toolbar<ImageSource, ImageAction>
          iconSize={ICON_SIZE}
          activeButtonColor={ICON_ACTIVE_COLOR}
          inactiveButtonColor={ICON_INACTIVE_COLOR}
          separatorColor="transparent"
          document={document}
          layout={toolbarLayout}
          contentContainerStyle={theme.toolbarContainer}
          bridge={bridge}
          pickOneImage={pickOneImage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
