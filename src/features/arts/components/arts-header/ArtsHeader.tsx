import { Theme, useThemeContext } from '@arts/core';
import { Caption } from '@arts/shared/components';

import './ArtsHeader.scss';

const THEME_TO_BACKGROUND: Record<Theme, string> = {
  [Theme.Hyperion]: 'ice-blue-milky-glass',
  [Theme.Aurora]: 'sleek-charcoal-dark-glass'
}

interface ArtsHeaderProps {
  title?: string;
  keyPrefix?: string;
}

export default function ArtsHeader({ keyPrefix, title }: ArtsHeaderProps) {
  const { theme } = useThemeContext();

  return (
    <div className={`arts-header-main ${THEME_TO_BACKGROUND[theme]}`}>
      <h2 className='assistant-regular'>
        <Caption namespace='arts' keyPrefix={keyPrefix}>
          {title}
        </Caption>
      </h2>
    </div>
  )
}