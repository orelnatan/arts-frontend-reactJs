import { useParams } from 'react-router-dom'

import { Direction, useDirectionContext } from '@arts/core'
import { Caption, SvgIcon } from '@arts/shared/components'
import { doubleArrow } from '@arts/assets/images'

import { type Crumb } from '../../models'

import './CrumbItem.scss'

interface CrumbItemProps {
  crumb: Crumb
  loading: boolean
  isLast: boolean
}

export default function CrumbItem({ crumb, loading, isLast }: CrumbItemProps) {
  const { direction } = useDirectionContext()
  const params = useParams()

  return (
    <div className="crumb-main" id={crumb.id(params)}>
      {crumb.image && (
        <img
          className="crumb-image-element"
          src={crumb.image}
          width={38}
          alt="Crumb Image"
        />
      )}

      {crumb.icon && (
        <span className="crumb-icon-element font-size-24">
          <SvgIcon icon={crumb.icon} />
        </span>
      )}

      <span className="assistant-bold">
        {loading ? (
          <Caption namespace="shared">loading</Caption>
        ) : (
          <Caption namespace={crumb.namespace} keyPrefix={crumb.keyPrefix}>
            {crumb.label}
          </Caption>
        )}
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
