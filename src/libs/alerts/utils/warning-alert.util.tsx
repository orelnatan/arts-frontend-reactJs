import { notifications, type NotificationData } from '@mantine/notifications';

import { ALERT_CONFIG } from '../consts';

export const warningAlert = (data: NotificationData) => {
  notifications.show({
    color: 'var(--color-warning)',
    ...ALERT_CONFIG,
    ...data, 
  });
};