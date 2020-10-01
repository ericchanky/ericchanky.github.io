import { Link as MaterialLink, LinkProps } from '@material-ui/core'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'

interface Props extends LinkProps {
  href: string
}

const InnerLink = ({ children, href, className, style }: Props, ref: React.Ref<any>) => (
  <GatsbyLink
    ref={ref}
    to={href}
    className={className}
    style={style}
  >
    {children}
  </GatsbyLink>
)

const Link = (props: Props) => {
  return (
    <MaterialLink
      {...props}
      component={React.forwardRef<any, Props>(InnerLink)}
    />
  )
}

export default React.memo(Link)
