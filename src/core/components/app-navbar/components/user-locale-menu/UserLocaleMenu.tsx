import { Direction, Locale } from "@arts/core/models";
import { MenuBar, Spinner, SvgIcon } from "@arts/shared/components";
import type { ListItem } from "@arts/shared/models";
import { language } from "@arts/assets/images";

import './UserLocaleMenu.scss';

interface UserLocaleMenuProps {
  value: Locale;
  loading?: boolean;
  onChange?: (value: Locale) => void;
}

const LOCALE_MENU: ListItem[] = [
  {
    id: 'lang-english',
    label: 'language-menu.english',
    value: Locale.En,
    dir: Direction.LTR,
  },
  {
    id: 'lang-hebrew',
    label: 'language-menu.hebrew',
    value: Locale.He,
    dir: Direction.RTL,
  }
]

export default function UserLocaleMenu({
  value,
  loading,
  onChange
}: UserLocaleMenuProps) {
  return (
    <div className="user-locale-menu-main">
      <MenuBar 
        namespace='core'
        keyPrefix='app-navbar'
        position='top-end'
        actives={[value]}
        disabled={loading}
        items={LOCALE_MENU}
        onSelect={locale => {
          onChange?.(locale.value as Locale)
        }}
      >
        {loading ? (
          <Spinner size={20} color='var(--color-app-navbar-text)' />
        ) : (
          <SvgIcon 
            icon={language}
            style={{ cursor: "pointer" }}
          />
        )}
      </MenuBar>
    </div>
  )
}