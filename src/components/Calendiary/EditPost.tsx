import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogProps, fade, IconButton, makeStyles, Theme, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import cx from 'classnames'
import { format, formatISO } from 'date-fns'
import { ContentState, Editor, EditorState, getDefaultKeyBinding, Modifier } from 'draft-js'
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
      padding: theme.spacing(),
      border: '1px solid transparent',
    },
    activeColorPicker: {
      border: `1px solid ${theme.palette.primary.main}`,
    },
    blockPicker: {
      cursor: 'pointer',
      marginRight: theme.spacing(),
      marginBottom: theme.spacing(),
    },
    '@global': {
      '.public-DraftEditorPlaceholder-root': {
        position: 'absolute',
        color: fade(theme.palette.text.primary, 0.4),
      },
      '.public-DraftStyleDefault-block, .public-DraftStyleDefault-ol, .public-DraftStyleDefault-ul': ({ color }: { color: string }) => ({
        color,
        padding: 0,
      }),
    },
  }
})

// const BLOCK_TYPES = [
//   { label: 'H1', style: 'header-one' },
//   { label: 'H2', style: 'header-two' },
//   { label: 'H3', style: 'header-three' },
//   { label: 'H4', style: 'header-four' },
//   { label: 'H5', style: 'header-five' },
//   { label: 'H6', style: 'header-six' },
//   { label: 'Blockquote', style: 'blockquote' },
//   { label: 'UL', style: 'unordered-list-item' },
//   { label: 'OL', style: 'ordered-list-item' },
//   { label: 'Code Block', style: 'code-block' },
// ]

const EditPost = ({ dialogProps, post, fetch, onClose }: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [color, setColor] = React.useState(post.color || take(colorPool))
  const [editorState, setEditorState] = React.useState(EditorState.moveFocusToEnd(EditorState.createWithContent(ContentState.createFromText(post.text || ''))))
  const [loading, setLoading] = React.useState(false)

  const editorRef = React.createRef<Editor>()
  React.useEffect(() => {
    setTimeout(() => {
      if (!editorRef.current) { return }
      editorRef.current.focus()
    }, 0)
  }, [editorRef])

  const { colorPicker, activeColorPicker } = useStyles({ color })


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
        {/* <Box>
          {BLOCK_TYPES.map((type) => {
            return (
              <Typography
                key={type.label}
                className={blockPicker}
                display="inline"
                onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, type.style))}
              >
                {type.label}
              </Typography>
            )
          })}
        </Box> */}
        <Editor
          ref={editorRef}
          ariaLabel="notes"
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Write something..."
          keyBindingFn={(evt) => {
            if (evt.keyCode === 9) {
              console.log('dsfas')
              const ncs = Modifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), '    ')
              setEditorState(EditorState.push(editorState, ncs, 'insert-fragment'))
              return null
            }
            return getDefaultKeyBinding(evt)
          }}
        />
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
