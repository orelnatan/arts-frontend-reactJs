import { type User } from "@arts/core/models";
import { MenuBar, SvgIcon, Thumbnail } from "@arts/shared/components";
import type { ListItem } from "@arts/shared/models";
import { disconnect, profile, settings, statistics } from "@arts/assets/images";

interface UserThumbnailMenuProps {
  user: User | null;
  value?: string;
  logout: () => void;
}

const USER_MENU: ListItem[] = [
  {
    id: 'system-profile',
    label: 'user-menu.profile-label',
    icon: <SvgIcon icon={profile} />,
    value: 'system-profile'
  },
  {
    id: 'system-settings',
    label: 'user-menu.settings-label',
    icon: <SvgIcon icon={settings} />,
    value: 'system-settings',
  },
  {
    id: 'system-statistics',
    label: 'user-menu.statistics-label',
    icon: <SvgIcon icon={statistics} />,
    value: 'system-statistics',
  },
  {
    id: 'system-logout',
    label: 'user-menu.logout-label',
    icon: <SvgIcon icon={disconnect} />,
    class: 'menu-bar-item-error-state',
    actionKey: 'logout',
    value: 'system-logout',
  }
]

export default function UserThumbnailMenu({
  user,
  value = '',
  logout
}: UserThumbnailMenuProps) {
  const actions: Record<string, () => void> = {
    logout: () => {
      logout();
    }

    // more actions here...
  };

  return (
    <div className="user-locale-menu-main">
      <MenuBar 
        namespace='core'
        keyPrefix='app-navbar'
        position='top-end'
        actives={[value]}
        items={USER_MENU}
        onSelect={
          item => item.actionKey && actions[item.actionKey]()
        }
      >
        <Thumbnail 
          image={user?.avatar}
          name={user?.name}
        />
      </MenuBar>
    </div>
  )
}