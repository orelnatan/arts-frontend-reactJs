import type { PropsWithChildren } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

import { Anchor, type AnchorProps } from '@mantine/core'

type LinkAnchorProps = PropsWithChildren<AnchorProps & LinkProps>

export default function LinkAnchor({ children, ...props }: LinkAnchorProps) {
  return (
    <Anchor component={Link} {...props}>
      <span className="font-size-12 assistant-bold">{children}</span>
    </Anchor>
  )
}
