import { notifications, type NotificationData } from '@mantine/notifications';

import { ALERT_CONFIG } from '../consts';

export const errorAlert = (data: NotificationData) => {
  notifications.show({
    color: 'var(--color-error)',
    ...ALERT_CONFIG,
    ...data, 
  });
};