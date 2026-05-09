import { notifications, type NotificationData } from '@mantine/notifications';

import { ALERT_CONFIG } from '../consts';

export const infoAlert = (data: NotificationData) => {
  notifications.show({
    color: 'var(--color-info)',
    ...ALERT_CONFIG,
    ...data, 
  });
};