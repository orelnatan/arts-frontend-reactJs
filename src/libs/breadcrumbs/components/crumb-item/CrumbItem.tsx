import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Direction, useDirectionContext } from '@arts/core'
import { Caption, SvgIcon } from '@arts/shared/components'
import { doubleArrow } from '@arts/assets/images'

import { type Crumb } from '../../models'

import './CrumbItem.scss'

interface CrumbProps {
  crumb: Crumb
  isLast: boolean
}

export default function CrumbItem({ crumb, isLast }: CrumbProps) {
  const params = useParams()
  const { direction } = useDirectionContext()

  const [resolvedCrumb, setResolvedCrumb] = useState<Crumb | null>(null)

  const loading = useRef<boolean>(false)

  useEffect(() => {
    const initCrumb = async () => {
      if (loading.current) return

      loading.current = true
      if (crumb.resolve) {
        try {
          const crumbData = await crumb.resolve(params)

          setResolvedCrumb({
            ...crumb,
            ...crumbData,
          })
        } catch (exp) {
          console.log(exp)
        } finally {
          loading.current = false
        }
      } else {
        setResolvedCrumb(crumb)
        loading.current = false
      }
    }

    initCrumb()
  }, [crumb, params])

  return (
    <div className="crumb-main" id={resolvedCrumb?.id(params)}>
      <span className="assistant-bold">
        {loading.current ? (
          <Caption namespace="shared">loading</Caption>
        ) : (
          <Caption
            namespace={resolvedCrumb?.namespace}
            keyPrefix={resolvedCrumb?.keyPrefix}
          >
            {resolvedCrumb?.label}
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
