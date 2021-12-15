import { BellOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";

import "./style.scss";
export default function HeaderAdmin() {
  return (
    <>
      <div className="admin-header">
        <h1 className="admin-title">Hotel Manager</h1>
        <div className="admin-action-header">
          <div className="notification-admin">
            <div className="icon">
              <BellOutlined />
            </div>
            <span>1</span>
          </div>
          <div className="message-admin">
            <div className="icon">
              <MessageOutlined />
            </div>
            <span>1</span>
          </div>
          <div className="avatar-admin">
            <Avatar size={32} icon={<UserOutlined />} />
          </div>
        </div>
      </div>
      <hr id='hr' />
    </>
  );
}
