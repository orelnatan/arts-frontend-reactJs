import { notifications, type NotificationData } from '@mantine/notifications';

import { ALERT_CONFIG } from '../consts';

export const successAlert = (data: NotificationData) => {
  notifications.show({
    color: 'var(--color-success)',
    ...ALERT_CONFIG,
    ...data, 
  });
};