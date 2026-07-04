import {
  Direction,
  Theme,
  useDirectionContext,
  useThemeContext,
} from '@arts/core'
import { Caption, SvgIcon } from '@arts/shared/components'
import { InputSearch } from '@arts/libs/form-utils'
import { sideArrow } from '@arts/assets/images'

import './ArtsHeader.scss'

const THEME_TO_BACKGROUND: Record<Theme, string> = {
  [Theme.Hyperion]: 'ice-blue-milky-glass',
  [Theme.Aurora]: 'sleek-charcoal-dark-glass',
}

interface ArtsHeaderProps {
  title?: string
  keyPrefix?: string
  withRedirectArrow?: boolean
  search?: (value: string) => void
  redirect?: () => void
}

export default function ArtsHeader({
  keyPrefix,
  title,
  withRedirectArrow,
  search,
  redirect,
}: ArtsHeaderProps) {
  const { theme } = useThemeContext()
  const { direction } = useDirectionContext()

  return (
    <div className={`arts-header-main ${THEME_TO_BACKGROUND[theme]}`}>
      <section>
        {withRedirectArrow && (
          <span className="redirect-arrow font-size-20">
            <SvgIcon
              icon={sideArrow}
              style={{
                transform: `rotate(${direction === Direction.LTR ? 90 : -90}deg)`,
                cursor: 'pointer',
              }}
              onClick={redirect}
            />
          </span>
        )}

        <h2 className="assistant-regular">
          <Caption namespace="arts" keyPrefix={keyPrefix}>
            {title}
          </Caption>
        </h2>
      </section>

      <section>
        <InputSearch
          debounceMs={700}
          placeholder="search"
          namespace="arts"
          onChange={search}
        />
      </section>
    </div>
  )
}
