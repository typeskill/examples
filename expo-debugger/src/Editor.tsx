import React, { memo } from 'react'
import { Platform } from 'react-native'
import {
  Toolbar,
  DocumentControlAction,
  buildVectorIconControlSpec,
  GenericControlAction,
  Images,
  CONTROL_SEPARATOR,
  Typer,
} from '@typeskill/typer'
import { Debugger, DebuggerActions } from '@typeskill/debugger'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { PermissionStatus } from 'expo-permissions'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'

type ImageAction = 'TAKE_PICTURE' | 'SELECT_FROM_GALLERY'

interface ImageSource {
  uri: string
  name: string
}

function buildMaterialCommunityControlSpec(actionType: GenericControlAction, name: string, options?: any) {
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
  CONTROL_SEPARATOR,
  buildMaterialCommunityControlSpec(DebuggerActions.COPY_DOCUMENT_SOURCE, 'clipboard-text-outline'),
  buildMaterialCommunityControlSpec(DebuggerActions.ERASE_DOCUMENT, 'delete-forever-outline'),
]

async function askCameraRollPermission() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
  if (status !== PermissionStatus.GRANTED) {
    throw new Error(`Missing Camera Roll permission. Status is: ${status}`)
  }
}

async function askCameraPermission() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA)
  if (status !== PermissionStatus.GRANTED) {
    throw new Error(`Missing Camera permission. Status is: ${status}`)
  }
}

async function pickImageAsync(options: ImageAction) {
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
  const imageInfo = response as ImageInfo
  const description: Images.Description<ImageSource> = {
    source: {
      uri: imageInfo.uri,
      name: imageInfo.uri.substring(imageInfo.uri.lastIndexOf('/') + 1),
    },
    width: imageInfo.width,
    height: imageInfo.height,
  }
  return description
}

const typerProps: Partial<Typer.Props<any>> = {
  maxMediaBlockHeight: 250
}

export const Editor = memo(function Editor() {
  return (
    <Debugger typerProps={typerProps} pickOneImage={pickImageAsync} toolbarLayout={toolbarLayout} />
  )
})
