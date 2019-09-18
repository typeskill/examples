import { StyleSheet, Platform } from 'react-native'

export const THEME_COLOR = '#8acec6'
export const TOOLBAR_BG = THEME_COLOR
export const ICON_INACTIVE_COLOR = '#6c809a'
export const ICON_ACTIVE_COLOR = '#795663'
export const TYPER_BG = '#ffffff'
export const GUI_BORDER_COLOR = '#6c809a'
export const GUI_BORDER_WIDTH = 2
export const ICON_SIZE = 25
export const SPACING = 10

export const editorStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  textStyle: {
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
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
    borderRadius: SPACING,
    borderWidth: GUI_BORDER_WIDTH,
    borderColor: GUI_BORDER_COLOR,
  },
  typerContent: {
    marginBottom: ICON_SIZE + 4,
  },
  toolbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: SPACING,
    right: SPACING,
    elevation: 1000,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(138,206,198,0.95)',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: SPACING,
    borderBottomRightRadius: SPACING,
    borderTopWidth: GUI_BORDER_WIDTH,
    borderColor: GUI_BORDER_COLOR,
  },
})
