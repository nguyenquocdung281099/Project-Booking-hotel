import { notification } from "antd";

export const showNotification = (type, description) => {
  notification[type]({
    description,
  });
};
