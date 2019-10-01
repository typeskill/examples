import { StyleSheet, Platform } from 'react-native'

export const THEME_COLOR = '#f0f0f0'
export const TOOLBAR_BG = THEME_COLOR
export const ICON_INACTIVE_COLOR = '#6c809a'
export const ICON_ACTIVE_COLOR = '#253545'
export const TYPER_BG = '#ffffff'
export const GUI_BORDER_COLOR = 'transparent'
export const GUI_BORDER_WIDTH = 2
export const ICON_SIZE = 25
export const SPACING = 10

export const theme = StyleSheet.create({
  flex: {
    flex: 1,
  },
  textStyle: {
    fontSize: 16,
  },
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: THEME_COLOR,
    position: 'relative',
    borderTopWidth: GUI_BORDER_WIDTH,
    borderColor: GUI_BORDER_COLOR,
  },
  typerContainer: {
    flex: 1,
    marginHorizontal: SPACING,
    marginTop: SPACING,
    backgroundColor: TYPER_BG,
    borderWidth: GUI_BORDER_WIDTH,
    borderColor: GUI_BORDER_COLOR,
  },
  toolbarContainer: {
    left: SPACING,
    right: SPACING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: GUI_BORDER_COLOR,
  },
})
