import { NavLink } from 'react-router-dom'

import { SvgIcon } from '@arts/shared/components'
import { notesPan, starFavHalf, viewVision } from '@arts/assets/images'

import './ProductIconsBar.scss'

interface ProductIconsBarProps {
  isFavorite?: boolean
  toggleFavorite?: () => void
}

export default function ProductIconsBar({
  isFavorite,
  toggleFavorite,
}: ProductIconsBarProps) {
  return (
    <div className="product-icons-bar-main">
      <NavLink
        to={`view`}
        className={'font-size-24'}
        style={({ isActive }) => ({
          color: isActive
            ? 'var(--color-app-drawer-icon-active)'
            : 'var(--color-app-drawer-icon-inactive)',
          outline: 'none',
        })}
      >
        <SvgIcon icon={viewVision} />
      </NavLink>

      <NavLink
        to={`update`}
        className={'font-size-24'}
        style={({ isActive }) => ({
          color: isActive
            ? 'var(--color-app-drawer-icon-active)'
            : 'var(--color-app-drawer-icon-inactive)',
          outline: 'none',
        })}
      >
        <SvgIcon icon={notesPan} />
      </NavLink>

      <span
        className="font-size-20"
        style={{
          color: isFavorite
            ? 'var(--color-app-drawer-icon-favorite)'
            : 'var(--color-app-drawer-icon-inactive)',
        }}
      >
        <SvgIcon
          icon={starFavHalf}
          style={{ cursor: 'pointer' }}
          onClick={toggleFavorite}
        />
      </span>
    </div>
  )
}
