import Avatar from 'antd/lib/avatar/avatar'
import './style.scss'
import ReactLoading from 'react-loading'

export default function AdminReply({ replyContent, loading }) {
  return (
    <div className="admin-reply_wrap">
      <Avatar size={40} src="https://cdn-icons-png.flaticon.com/512/2206/2206368.png" />
      <div className="cb-adminReply">
        {loading ? (
          <ReactLoading type={'bars'} color={'#C388F6'} height={20} width={30} />
        ) : (
          replyContent
        )}
      </div>
    </div>
  )
}
