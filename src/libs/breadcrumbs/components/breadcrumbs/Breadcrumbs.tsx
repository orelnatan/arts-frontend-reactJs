import { useBreadcrumbsContext } from '../../hooks'
import type { Crumb as CrumbItem } from '../../models'
import { Crumb } from '../crumb'

import './Breadcrumbs.scss'

export default function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbsContext()

  return (
    <div className="breadcrumbs-main">
      {breadcrumbs.map((crumb: CrumbItem, index: number) => (
        <Crumb
          crumb={crumb}
          key={crumb.id}
          isLast={index + 1 === breadcrumbs.length}
        />
      ))}
    </div>
  )
}
