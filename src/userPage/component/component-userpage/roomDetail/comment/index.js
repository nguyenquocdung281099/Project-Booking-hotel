import "./style.scss";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Rate } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComment } from "../../../../../redux/action";
import { isEmpty } from "lodash";

export default function Comment(id) {
  const [dataNewComment, setDataNewComment] = useState({
    content: "",
    rate: 0,
  });

  const userCurrent = useSelector((state) => state.user.userCurrent);
  const DataComment = useSelector((state) => state.comments.comment);
  const { data, meta } = DataComment;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComment({ id: id.id, page: 1, limit: 5 }));
  }, [userCurrent]);

  return (
    <div className="comment-container">
      <header>
        <p>The Conversation ({data.length})</p>
        <span>Sraer a discussion, not a fire, Post with Kindness</span>
        <hr />
      </header>
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
                dispatch(
                  createComment({
                    requestData: {
                      idUser: userCurrent.id,
                      ...dataNewComment,
                      idRoom: id.id,
                    },
                  })
                );
                setDataNewComment({
                  content: "",
                  rate: 0,
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
      <hr />
      <main>
        {!isEmpty(data) &&
          data.map((item, index) => {
            return (
              <div className="comment_item" key={index}>
                <div className="avatar">
                  <Avatar size={64} icon={<UserOutlined />} />
                </div>
                <div className="comment-content">
                  <div className="header-content">
                    <p className="name_user">NGUYEN QUOC DUNG</p>

                    <Rate disabled defaultValue={2} />
                  </div>
                  <div className="content-comment">
                    con gaduawdgyawhduabwudauwdiajwdhaiwdhawdanskdnawgdaisndavwdhasd awgdad
                  </div>
                  <p className="time">14h00-20/11/2012</p>
                </div>
              </div>
            );
          })}
      </main>
    </div>
  );
}
