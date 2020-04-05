import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogProps, fade, IconButton, makeStyles, Theme, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import cx from 'classnames'
import { format, formatISO } from 'date-fns'
import { ContentState, Editor, EditorState } from 'draft-js'
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
      '.public-DraftStyleDefault-block, .public-DraftStyleDefault-ol, .public-DraftStyleDefault-ul': ({ color }: { color: string }) => ({
        color,
      }),
    },
  }
})

const EditPost = ({ dialogProps, post, fetch, onClose }: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [color, setColor] = React.useState(post.color || take(colorPool))
  const [editorState, setEditorState] = React.useState(EditorState.moveFocusToEnd(EditorState.createWithContent(ContentState.createFromText(post.text || ''))))
  const [loading, setLoading] = React.useState(false)

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
        <Editor
          placeholder="Write something..."
          editorState={editorState}
          onChange={setEditorState}
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
