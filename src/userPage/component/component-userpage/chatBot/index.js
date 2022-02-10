import Avatar from 'antd/lib/avatar/avatar'
import { useSelector } from 'react-redux'
import { CloseOutlined, SendOutlined } from '@ant-design/icons'

import './styles.scss'
import { useEffect, useState } from 'react'
import AdminReply from './component/adminReply'
import MeReply from './component/meReply'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

export default function ChatBot() {
  const userCurrent = useSelector((state) => state.user.userCurrent)
  const { t } = useTranslation()
  const [dataChatBot, setDataChatBot] = useState([])
  const replyLoading = {
    rule: 'admin',
    loading: true,
    content: '',
  }
  const [replyUser, setReplyUser] = useState('')
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    async function setDataChatStart(params) {
      if (hidden === false && isEmpty(dataChatBot)) {
        dataChatBot.push(replyLoading)
        await setDataChatBot([...dataChatBot])

        setTimeout(() => {
          dataChatBot.pop()
          dataChatBot.push({
            rule: 'admin',
            content:
              'Xin chào, bạn muốn nói chuyện trực tiếp hay với tôi(chatbot), tôi có thể đặt phòng cho bạn?',
            loading: false,
            optionReplyOfUser: ['Admin', 'Me(ChatBot)', 'Me(ChatBot)'],
          })
          setDataChatBot([...dataChatBot])
        }, 1000)
      }
    }
    setDataChatStart()
  }, [hidden])
  return (
    <div className="chatbot">
      {!isEmpty(userCurrent) && (
        <>
          <div className={`chatbot-wrapper ${hidden && 'cb-hidden'}`}>
            <div className="cb-main">
              <div className="cb-main_header">
                <div className="cb-infor">
                  <Avatar
                    size={40}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-SXEmml16iowGP0nJSqhWzcdTKqbSwcyBbg&usqp=CAU"
                  />
                  Nguyen Quoc Dung
                </div>
                <div className="cb-action">
                  <span
                    className="action-cb-hiden"
                    onClick={() => {
                      setHidden(true)
                    }}
                  >
                    -
                  </span>
                  <CloseOutlined
                    onClick={() => {
                      setDataChatBot([])
                      setHidden(true)
                      setReplyUser('')
                    }}
                  />
                </div>
              </div>
              <div className="cb-main_content">
                {isEmpty(dataChatBot) ||
                  dataChatBot.map((item, index) => {
                    if (item.rule === 'admin') {
                      return (
                        <>
                          <AdminReply
                            key={`${index}-admin`}
                            replyContent={item.content}
                            loading={item?.loading}
                          />
                          <div className="box-option">
                            {!isEmpty(item?.optionReplyOfUser) &&
                              item.optionReplyOfUser.map((itemOption) => (
                                <span
                                  onClick={() => {
                                    async function reply(params) {
                                      dataChatBot.push({
                                        rule: 'user',
                                        content: itemOption,
                                      })
                                      dataChatBot[index] = {
                                        ...dataChatBot[index],
                                        optionReplyOfUser: [],
                                      }
                                      const ind = dataChatBot.findIndex(
                                        (item) => item?.loading === true
                                      )
                                      if (ind === -1) {
                                        dataChatBot.push(replyLoading)
                                        await setDataChatBot([...dataChatBot])
                                        setTimeout(() => {
                                          dataChatBot.pop()
                                          dataChatBot.push({
                                            rule: 'admin',
                                            content: 'thanks you so much',
                                          })
                                          setDataChatBot([...dataChatBot])
                                        }, 2000)
                                      } else {
                                        dataChatBot.splice(ind, 1)
                                        dataChatBot.push(replyLoading)
                                        await setDataChatBot([...dataChatBot])
                                        setReplyUser('')

                                        setTimeout(() => {
                                          dataChatBot.pop()
                                          dataChatBot.push({
                                            rule: 'admin',
                                            content: 'cảm ơn bạn nhiều ',
                                          })
                                          setDataChatBot([...dataChatBot])
                                        }, 2000)
                                      }
                                    }
                                    reply()
                                  }}
                                  className="option-item"
                                >
                                  {itemOption}
                                </span>
                              ))}
                          </div>
                        </>
                      )
                    }
                    return <MeReply replyContent={item.content} key={`${index}-user`} />
                  })}
              </div>
              <div className="cb-main_footer">
                <textarea
                  autoFocus
                  rows={1}
                  placeholder="Write A Message"
                  onChange={(e) => {
                    setReplyUser(e.target.value)
                  }}
                  value={replyUser}
                  onKeyPress={(keys) => {
                    if (keys.key === 'Enter') {
                      dataChatBot.push({
                        rule: 'user',
                        content: replyUser,
                      })
                      setDataChatBot([...dataChatBot])
                      setReplyUser('')
                    }
                  }}
                />
                <SendOutlined
                  style={{
                    cursor: `${isEmpty(replyUser) ? 'not-allowed' : 'pointer'} `,
                  }}
                  onClick={() => {
                    async function onClickSendData(params) {
                      if (!isEmpty(replyUser)) {
                        const ind = dataChatBot.findIndex((item) => item?.loading === true)
                        if (ind === -1) {
                          dataChatBot.push({
                            rule: 'user',
                            content: replyUser,
                          })
                          dataChatBot.push(replyLoading)
                          await setDataChatBot([...dataChatBot])
                          setReplyUser('')

                          setTimeout(() => {
                            dataChatBot.pop()
                            dataChatBot.push({
                              rule: 'admin',
                              content: 'thanks you so much',
                            })
                            setDataChatBot([...dataChatBot])
                          }, 2000)
                        } else {
                          dataChatBot.splice(ind, 1)
                          dataChatBot.push({
                            rule: 'user',
                            content: replyUser,
                          })
                          dataChatBot.push(replyLoading)
                          await setDataChatBot([...dataChatBot])
                          setReplyUser('')

                          setTimeout(() => {
                            dataChatBot.pop()
                            dataChatBot.push({
                              rule: 'admin',
                              content: 'thanks you so much',
                            })
                            setDataChatBot([...dataChatBot])
                          }, 2000)
                        }
                      }
                    }

                    onClickSendData()
                  }}
                />
              </div>
            </div>
          </div>
          <div className={`chatbot-icon ${hidden || 'cb-icon-hidden'}`}>
            <div
              className={`cb-circle `}
              onClick={() => {
                setHidden(false)
              }}
            >
              <img src="https://cdn-icons-png.flaticon.com/512/2206/2206368.png" alt="img admin" />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
