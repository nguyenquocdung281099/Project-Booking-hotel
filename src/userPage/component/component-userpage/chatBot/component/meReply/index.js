import Avatar from 'antd/lib/avatar/avatar'
import './style.scss'

export default function MeReply({ replyContent }) {
  return (
    <div className="me-reply_wrap">
      <div className="cb-meReply">{replyContent}</div>
      <Avatar size={40} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-SXEmml16iowGP0nJSqhWzcdTKqbSwcyBbg&usqp=CAU" />
    </div>
  )
}
