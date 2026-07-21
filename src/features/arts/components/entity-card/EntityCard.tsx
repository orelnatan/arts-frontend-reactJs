import { Card, Image, Group } from '@mantine/core'

import { PrimaryButton } from '@arts/libs/form-utils'
import { eyeSee, starFavFull } from '@arts/assets/images'
import { highlightText } from '@arts/shared/utils'

import type { Entity } from '../../models'

import './EntityCard.scss'
import { SvgIcon } from '@arts/shared/components'

interface EntityCardProps {
  entity: Entity
  highlightQuery?: string
  isFavorite?: boolean
  view?: () => void
}

export default function EntityCard({
  entity,
  highlightQuery = '',
  isFavorite,
  view,
}: EntityCardProps) {
  return (
    <div className="entity-card-main">
      <span className="favorite-entity-icon font-size-24">
        {isFavorite && <SvgIcon icon={starFavFull} />}
      </span>

      <Card shadow="sm" padding="md" withBorder>
        <Card.Section>
          <Image src={entity.image} height={160} alt={entity.name} />
        </Card.Section>

        <Group mt="md" mb="xs">
          <h3
            className="entity-card-header assistant-bold"
            dangerouslySetInnerHTML={{
              __html: highlightText(entity.name, highlightQuery),
            }}
          />
        </Group>

        <div className="entity-card-description font-size-12">
          <p>{entity.description}</p>
        </div>

        <div className="entity-card-view-control">
          <PrimaryButton
            namespace="arts"
            keyPrefix="entity-card"
            label="view"
            rightIcon={eyeSee}
            onClick={view}
          />
        </div>
      </Card>
    </div>
  )
}
