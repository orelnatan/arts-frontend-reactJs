import { notifications, type NotificationData } from '@mantine/notifications';

export const successAlert = (data: NotificationData) => {
  notifications.show({
    position: "bottom-right",
    autoClose: 5500,
    withCloseButton: true,
    color: 'var(--color-success)',
    classNames: {
      title: "mantine-notification-alert-title",
      description: "mantine-notification-alert-description",
    },
    ...data, 
  });
};