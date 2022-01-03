
import "./style.scss";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Pagination, Rate } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComment } from "../../../../../redux/action";
import { isArray, isEmpty } from "lodash";
import socketIOClient from "socket.io-client";
import moment from "moment";

const host = "http://localhost:5555";
export default function Comment(id) {
  const [dataNewComment, setDataNewComment] = useState({
    content: "",
    rate: 0,
  });

  const [listComment, setListComment] = useState([]);
  const [total, setTotal] = useState(0);

  const userCurrent = useSelector((state) => state.user.userCurrent);
  const DataComment = useSelector((state) => state.comments.comment);
  const { data, meta } = DataComment;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComment({ id: id.id, page: 1, limit: 5 }));
  }, [userCurrent]);

  useEffect(() => {
    setListComment(data);
    setTotal(meta.total);
  }, [DataComment]);
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);

    socketRef.current?.on("getId", (data) => {}); // phần này đơn giản để gán id cho mỗi phiên kết nối vào page. Mục đích chính là để phân biệt đoạn nào là của mình đang chat.

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  socketRef.current?.on("sendDataServer", (dataGot) => {
    setTotal(total + 1);
    if (total % 5 === 0) {
      dispatch(getComment({ id: id.id, page: meta.page, limit: 5 }));
    }
    if (listComment.length === 5) {
      listComment.pop();
    }
    const newData = [...listComment];
    newData.unshift(dataGot);
    console.log(dataGot);
    dataGot.idRoom === id.id && meta.page === 1 && setListComment([...newData]);
  }); // mỗi khi có tin nhắn thì mess sẽ được render thêm
  return (
    <div className="comment-container">
      <header>
        <p>The Conversation ({listComment.length})</p>
        <span>Sraer a discussion, not a fire, Post with Kindness</span>
        <hr />
      </header>
      {userCurrent && (
        <div className="create_comment">
          <div className="avatar">
            {userCurrent.avatar ? (
              <Avatar size={64} src={userCurrent.avatar} />
            ) : (
              <Avatar size={64} icon={<UserOutlined />} />
            )}
          </div>
          <div className="content">
            <div className="header-create">
              <Rate
                value={dataNewComment.rate}
                onChange={(value) => setDataNewComment({ ...dataNewComment, rate: value })}
              />
              <Button
                onClick={() => {
                  setDataNewComment({
                    content: "",
                    rate: 0,
                  });
                  socketRef.current.emit("sendCommentFromClient", {
                    idUser: userCurrent.id,
                    ...dataNewComment,
                    idRoom: id.id,
                    avatar: userCurrent.avatar,
                    userName: userCurrent.userName,
                  });
                }}
                disabled={!dataNewComment.content}
              >
                ADD
              </Button>
            </div>
            <textarea
              onChange={(e) => setDataNewComment({ ...dataNewComment, content: e.target.value })}
              placeholder="Add a comment..."
              value={dataNewComment.content}
            ></textarea>
          </div>
        </div>
      )}
      <hr />
      <main>
        {listComment.map((item, index) => {
          return (
            <>
              <div className="comment_item" key={index}>
                <div className="avatar">
                  {item.avatar ? (
                    <Avatar size={64} src={item.avatar} />
                  ) : (
                    <Avatar size={64} icon={<UserOutlined />} />
                  )}
                </div>
                <div className="comment-content">
                  <div className="header-content">
                    <p className="name_user">{item.userName}</p>

                    <Rate disabled defaultValue={item.rate} />
                  </div>
                  <div className="content-comment">{item.content}</div>
                  <p className="time">
                    {calculateDate(moment(item.createAt), "minutes") < 10
                      ? "minutes ago"
                      : calculateDate(moment(item.createAt), "hours") < 23
                      ? `${calculateDate(moment(item.createAt), "hours")} hours ago`
                      : moment(item.createAt).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </main>
      <div className="pagination">
        <Pagination
          total={meta.total}
          current={meta.page}
          onChange={(page) => {
            dispatch(getComment({ id: id.id, page: page, limit: 5 }));
          }}
          pageSize={5}
        />
      </div>
    </div>
  );
}

function calculateDate(type, date) {
  return moment().diff(date, type);
}
