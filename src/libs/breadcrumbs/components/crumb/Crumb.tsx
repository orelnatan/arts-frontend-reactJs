import { Direction, useDirectionContext } from '@arts/core'
import { Caption, SvgIcon } from '@arts/shared/components'
import { doubleArrow } from '@arts/assets/images'

import type { Crumb } from '../../models'

import './Crumb.scss'

interface CrumbProps {
  crumb: Crumb
  isLast: boolean
}

export default function Crumb({ crumb, isLast }: CrumbProps) {
  const { direction } = useDirectionContext()

  return (
    <div className="crumb-main" id={crumb.id}>
      <span className="assistant-bold">
        <Caption namespace={crumb.namespace} keyPrefix={crumb.keyPrefix}>
          {crumb.label}
        </Caption>
      </span>

      {!isLast && (
        <span className="crumb-separator-icon font-size-20">
          <SvgIcon
            icon={doubleArrow}
            style={{
              transform: `rotate(${direction === Direction.LTR ? 0 : -180}deg)`,
            }}
          />
        </span>
      )}
    </div>
  )
}
