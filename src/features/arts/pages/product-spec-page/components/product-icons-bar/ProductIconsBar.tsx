import { NavLink } from 'react-router-dom'

import { Spinner, SvgIcon } from '@arts/shared/components'
import {
  notesPan,
  recycleBin,
  starFavFull,
  starFavHalf,
  viewVision,
} from '@arts/assets/images'

import './ProductIconsBar.scss'

interface ProductIconsBarProps {
  isFavorite?: boolean
  loadingFavoriteToggle?: boolean
  loadingProductDeletion?: boolean
  addFavorite?: () => void
  removeFavorite?: () => void
  deleteProduct?: () => void
}

export default function ProductIconsBar({
  isFavorite,
  loadingFavoriteToggle,
  loadingProductDeletion,
  addFavorite,
  removeFavorite,
  deleteProduct,
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
        className="favorite-star font-size-20"
        style={{
          color: isFavorite
            ? 'var(--color-app-drawer-icon-favorite)'
            : 'var(--color-app-drawer-icon-inactive)',
        }}
      >
        {loadingFavoriteToggle ? (
          <Spinner size={20} color="var(--color-app-drawer-icon-inactive)" />
        ) : (
          <SvgIcon
            icon={isFavorite ? starFavFull : starFavHalf}
            style={{ cursor: 'pointer' }}
            onClick={isFavorite ? removeFavorite : addFavorite}
          />
        )}
      </span>

      <span
        className="recycle-bin font-size-20"
        style={{
          color: 'var(--color-app-drawer-icon-inactive)',
        }}
      >
        {loadingProductDeletion ? (
          <Spinner size={20} color="var(--color-app-drawer-icon-inactive)" />
        ) : (
          <SvgIcon
            icon={recycleBin}
            style={{ cursor: 'pointer' }}
            onClick={deleteProduct}
          />
        )}
      </span>
    </div>
  )
}
