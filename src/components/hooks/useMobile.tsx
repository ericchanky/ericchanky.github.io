import { useMediaQuery, useTheme } from '@material-ui/core'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

export const useMobile = (breakpoint: Breakpoint = 'sm') => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoint))
  return isMobile
}
