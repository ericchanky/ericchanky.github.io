import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogProps, fade, IconButton, makeStyles, Theme, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import cx from 'classnames'
import { format, formatISO } from 'date-fns'
import { ContentState, Editor, EditorState, getDefaultKeyBinding, Modifier, SelectionState } from 'draft-js'
import React from 'react'
import uuid from 'uuid/v4'

import { CalendiaryPost, createPost } from '../../utils/calendiary'
import { colorPool, take } from '../../utils/rand'
import GridDivider from '../GridDivider'

interface Props {
  dialogProps: DialogProps
  post: Partial<CalendiaryPost>
  fetch(): void
  onClose(): void
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    colorPicker: {
      display: 'inline-block',
      cursor: 'pointer',
      marginRight: theme.spacing(),
      marginBottom: theme.spacing(),
      padding: theme.spacing(0.75),
      border: '2px solid transparent',
      borderRadius: '50%',
    },
    activeColorPicker: {
      borderColor: 'white',
    },
    blockPicker: {
      cursor: 'pointer',
      marginRight: theme.spacing(),
      marginBottom: theme.spacing(),
    },
    '@global': {
      '.public-DraftEditorPlaceholder-inner': {
        position: 'absolute',
        color: fade('#fff', 0.6),
      },
      '.public-DraftStyleDefault-block, .public-DraftStyleDefault-ol, .public-DraftStyleDefault-ul': () => ({
        color: '#fff',
      }),
    },
  }
})

const getLastOrderedList = (contentState: ContentState, key: string, preferedIndent = 0): RegExpMatchArray | null => {
  const lastBlock = contentState.getBlockBefore(key)
  if (!lastBlock || lastBlock.getText().length === 0) {
    // no match, stop
    return null
  }

  const matched = lastBlock.getText().match(/^( *)(\d+). /)
  if (matched && matched[1].length === preferedIndent) {
    return matched
  }

  return getLastOrderedList(contentState, lastBlock.getKey(), preferedIndent)
}

const EditPost = ({ dialogProps, post, fetch, onClose }: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [color, setColor] = React.useState(post.color || take(colorPool))
  const [editorState, setEditorState] = React.useState(EditorState.moveFocusToEnd(EditorState.createWithContent(ContentState.createFromText(post.text || ''))))
  const [loading, setLoading] = React.useState(false)

  const { colorPicker, activeColorPicker } = useStyles()

  const date = React.useMemo(() => post.date ? new Date(post.date) : new Date, [post.date])

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={isMobile}
      {...dialogProps}
      onClose={onClose}
    >
      <AppBar position="relative" elevation={0}>
        <Toolbar>
          <Typography variant="h5">{format(date, 'do MMMM, yyyy')}</Typography>
          <GridDivider />
          <IconButton
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Box>
          {colorPool.map((c) => {
            return (
              <Box
                key={c}
                className={cx(colorPicker, { [activeColorPicker]: color === c })}
                style={{ backgroundColor: c }}
                title={c}
                onClick={() => setColor(c)}
              />
            )
          })}
        </Box>
        <Editor
          placeholder="Write something..."
          editorState={editorState}
          onChange={setEditorState}
          // plugins={plugins}
          handleKeyCommand={(cmd: string) => {
            console.log('cmd', cmd)

            if (cmd === 'key-shift-tab') {
              const currentBlock = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getAnchorKey())

              const hasSpace = currentBlock.getText().match(/^( +)/)
              if (!hasSpace) { return 'not-handled' }

              const maxSlice = Math.min(hasSpace[1].length, 2)

              const matched = currentBlock.getText().match(/^( *)(\d+). /)
              if (matched && matched[2]) {
                // ordered list de-indent
                const lastMatched = getLastOrderedList(editorState.getCurrentContent(), editorState.getSelection().getAnchorKey(), matched[1].length - 2)

                if (lastMatched) {
                  // continue with last ordered list
                  const num = Number(lastMatched[2].replace('.', '')) + 1
                  const text = `${lastMatched[1]}${num}. `
                  const selectionRange = editorState.getSelection().merge({
                    anchorOffset: 0,
                    focusOffset: matched[0].length,
                  }) as SelectionState
                  const contentState = Modifier.replaceText(editorState.getCurrentContent(), selectionRange, text)
                  const selection = editorState.getSelection().merge({
                    anchorOffset: editorState.getSelection().getAnchorOffset() - maxSlice,
                    focusOffset: editorState.getSelection().getFocusOffset() - maxSlice,
                  }) as SelectionState
                  setEditorState(EditorState.forceSelection(EditorState.createWithContent(contentState), selection))
                  return 'handled'
                }

                // new ordered list
                const text = `${matched[1].slice(maxSlice)}1. `
                const selectionRange = editorState.getSelection().merge({
                  anchorOffset: 0,
                  focusOffset: matched[0].length,
                }) as SelectionState
                const contentState = Modifier.replaceText(editorState.getCurrentContent(), selectionRange, text)
                const selection = editorState.getSelection().merge({
                  anchorOffset: editorState.getSelection().getAnchorOffset() - maxSlice,
                  focusOffset: editorState.getSelection().getFocusOffset() - maxSlice,
                }) as SelectionState
                setEditorState(EditorState.forceSelection(EditorState.createWithContent(contentState), selection))
                return 'handled'
              }

              // normal
              const selectionStart = editorState.getSelection().merge({
                anchorOffset: 0,
                focusOffset: maxSlice,
              }) as SelectionState
              const contentState = Modifier.removeRange(editorState.getCurrentContent(), selectionStart, 'backward')
              const selection = editorState.getSelection().merge({
                anchorOffset: editorState.getSelection().getAnchorOffset() - maxSlice,
                focusOffset: editorState.getSelection().getFocusOffset() - maxSlice,
              }) as SelectionState
              setEditorState(EditorState.forceSelection(EditorState.createWithContent(contentState), selection))
              return 'handled'
            }

            if (cmd === 'key-tab') {
              const currentBlock = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getAnchorKey())
              const matched = currentBlock.getText().match(/^( *)(\d+). /)
              if (matched && matched[2]) {
                // ordered list indent
                const lastMatched = getLastOrderedList(editorState.getCurrentContent(), editorState.getSelection().getAnchorKey(), matched[1].length + 2)

                if (lastMatched) {
                  // continue with last ordered list
                  const num = Number(lastMatched[2].replace('.', '')) + 1
                  const text = `${lastMatched[1]}${num}. `
                  const selectionRange = editorState.getSelection().merge({
                    anchorOffset: 0,
                    focusOffset: matched[0].length,
                  }) as SelectionState
                  const contentState = Modifier.replaceText(editorState.getCurrentContent(), selectionRange, text)
                  const selection = editorState.getSelection().merge({
                    anchorOffset: editorState.getSelection().getAnchorOffset() + 2,
                    focusOffset: editorState.getSelection().getFocusOffset() + 2,
                  }) as SelectionState
                  setEditorState(EditorState.forceSelection(EditorState.createWithContent(contentState), selection))
                  return 'handled'
                }

                // new sub ordered list
                const text = `  ${matched[1]}1. `
                const selectionRange = editorState.getSelection().merge({
                  anchorOffset: 0,
                  focusOffset: matched[0].length,
                }) as SelectionState
                const contentState = Modifier.replaceText(editorState.getCurrentContent(), selectionRange, text)
                const selection = editorState.getSelection().merge({
                  anchorOffset: editorState.getSelection().getAnchorOffset() + 2,
                  focusOffset: editorState.getSelection().getFocusOffset() + 2,
                }) as SelectionState
                setEditorState(EditorState.forceSelection(EditorState.createWithContent(contentState), selection))
                return 'handled'
              }

              // normal
              const selectionStart = editorState.getSelection().merge({
                anchorOffset: 0,
                focusOffset: 0,
              }) as SelectionState
              const contentState = Modifier.insertText(editorState.getCurrentContent(), selectionStart, '  ')
              const selection = editorState.getSelection().merge({
                anchorOffset: editorState.getSelection().getAnchorOffset() + 2,
                focusOffset: editorState.getSelection().getFocusOffset() + 2,
              }) as SelectionState
              setEditorState(EditorState.forceSelection(EditorState.createWithContent(contentState), selection))
              return 'handled'
            }

            if (cmd === 'split-block') {
              const currentBlock = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getAnchorKey())
              const matched = currentBlock.getText().match(/^( *)(-|\d+.) /)
              if (matched) {
                if (currentBlock.getText().length === matched[0].length) {
                  // enter on empty list, stop using list
                  const rangeToRemove = editorState.getSelection().merge({
                    anchorOffset: 0,
                    focusOffset: currentBlock.getText().length,
                  }) as SelectionState
                  const contentState = Modifier.removeRange(editorState.getCurrentContent(), rangeToRemove, 'backward')
                  const selection = rangeToRemove.merge({
                    anchorOffset: 0,
                    focusOffset: 0,
                  }) as SelectionState
                  setEditorState(EditorState.forceSelection(EditorState.createWithContent(contentState), selection))
                  return 'handled'
                }

                if (matched[2] && matched[2].match(/\d+\./)) {
                  // new line with ordered list
                  const num = Number(matched[2].replace('.', '')) + 1
                  const text = `${matched[1]}${num}. `
                  const splitBlockContentState = Modifier.splitBlock(editorState.getCurrentContent(), editorState.getSelection())
                  const insertTextContentState = Modifier.insertText(splitBlockContentState, splitBlockContentState.getSelectionAfter(), text)
                  const Selection = splitBlockContentState.getSelectionAfter().merge({
                    focusOffset: text.length,
                    anchorOffset: text.length,
                  }) as SelectionState
                  setEditorState(EditorState.forceSelection(EditorState.createWithContent(insertTextContentState), Selection))
                  return 'handled'
                }

                // new line with list
                const text = `${matched[0]}`
                const splitBlockContentState = Modifier.splitBlock(editorState.getCurrentContent(), editorState.getSelection())
                const insertTextContentState = Modifier.insertText(splitBlockContentState, splitBlockContentState.getSelectionAfter(), text)
                const Selection = splitBlockContentState.getSelectionAfter().merge({
                  focusOffset: text.length,
                  anchorOffset: text.length,
                }) as SelectionState
                setEditorState(EditorState.forceSelection(EditorState.createWithContent(insertTextContentState), Selection))
                return 'handled'
              }

              return 'not-handled'
            }

            return 'not-handled'
          }}
          keyBindingFn={(evt) => {
            if (evt.keyCode === 9) {
              if (evt.shiftKey) { return 'key-shift-tab' }
              return 'key-tab'
            }

            return getDefaultKeyBinding(evt)
          }}
        />
        {/* <SideToolbar /> */}
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          size="small"
          onClick={async () => {
            setLoading(true)
            try {
              await createPost({
                id: post.id || uuid(),
                passcode: post.passcode || '',
                text: editorState.getCurrentContent().getPlainText(),
                date: formatISO(date),
                createdAt: post.createdAt || formatISO(new Date()),
                updatedAt: post.updatedAt || formatISO(new Date()),
                active: post.active || true,
                color: color,
              })
            } catch (err) {
              console.log(err)
            }

            setLoading(false)
            fetch()
            onClose()
          }}
          disabled={editorState.getCurrentContent().getPlainText().length === 0 || loading}
        >
          {post.id ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditPost
