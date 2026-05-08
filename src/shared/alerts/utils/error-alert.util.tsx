import { notifications, type NotificationData } from '@mantine/notifications';

export const errorAlert = (data: NotificationData) => {
  notifications.show({
    position: "bottom-right",
    autoClose: 5500,
    withCloseButton: true,
    color: 'var(--color-error)',
    classNames: {
      title: "mantine-notification-alert-title",
      description: "mantine-notification-alert-description",
    },
    ...data, 
  });
};