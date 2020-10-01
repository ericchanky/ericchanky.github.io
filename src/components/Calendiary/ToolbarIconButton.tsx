import { IconButton, IconButtonProps } from '@material-ui/core'
import React from 'react'

interface Props extends IconButtonProps {
  fullWidth?: boolean
}

const ToolbarIconButton = ({ fullWidth, ...props }: Props) => {
  return (
    <IconButton {...props} />
  )
}

export default ToolbarIconButton
