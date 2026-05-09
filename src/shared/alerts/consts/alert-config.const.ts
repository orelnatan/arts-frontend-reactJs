import { type NotificationData } from '@mantine/notifications';

export const ALERT_CONFIG: Partial<NotificationData> = {
  position: "bottom-left",
  autoClose: 5500,
  withCloseButton: true,
  classNames: {
    title: "mantine-notification-alert-title",
    description: "mantine-notification-alert-description",
  },
}