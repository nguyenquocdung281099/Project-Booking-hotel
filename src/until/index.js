import { notification } from "antd";
import { useHistory } from "react-router-dom";

export const showNotification = (type, description) => {
  notification[type]({
    description,
  });
};
export const History =() =>{
  return useHistory();
}