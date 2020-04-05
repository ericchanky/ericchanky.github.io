import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogProps, IconButton, makeStyles, Theme, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import cx from 'classnames'
import { format, formatISO } from 'date-fns'
import { EditorState } from 'draft-js'
import React from 'react'
import RichTextEditor, { EditorValue } from 'react-rte'
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
    editorStyle: {
      fontFamily: `${theme.typography.fontFamily}!important`,
      background: 'inherit!important',
      border: 'none!important',
    },
    '@global': {
      '.public-DraftEditor-content, .public-DraftEditorPlaceholder-root': {
        padding: '0!important',
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
  const [text, setText] = React.useState(EditorValue.createFromState(EditorState.moveFocusToEnd(RichTextEditor.createValueFromString(post.text || '', 'markdown').getEditorState())))
  const [loading, setLoading] = React.useState(false)

  const { colorPicker, activeColorPicker, editorStyle } = useStyles({ color })

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
        <RichTextEditor
          autoFocus
          className={editorStyle}
          toolbarStyle={{ margin: 0, border: 'none' }}
          placeholder="Write something..."
          value={text}
          onChange={setText}
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
                text: text.toString('markdown'),
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
          disabled={text.toString('markdown').length === 0 || loading}
        >
          {post.id ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditPost
