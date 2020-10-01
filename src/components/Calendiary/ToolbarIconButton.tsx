import { IconButton, IconButtonProps } from '@material-ui/core'
import React from 'react'

interface Props extends IconButtonProps {
  fullWidth?: boolean
  disableElevation?: boolean
}

const ToolbarIconButton = ({ fullWidth, disableElevation, ...props }: Props) => {
  return (
    <IconButton {...props} />
  )
}

export default ToolbarIconButton
