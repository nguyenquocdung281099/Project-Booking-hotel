import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import Page from './page'
import { getUserCurrent } from './redux/action'
import ChatBot from './userPage/component/component-userpage/chatBot'
const brain = require('brain.js').brain
function App() {
  const dispatch = useDispatch()
  const getUser = async () => {
    const email = JSON.parse(localStorage.getItem('emailUser'))
    if (email) {
      // const user = await RestClient.post("https://booking-hotel-api-dungnq.herokuapp.com/userCurrent", {});
      // setUsers(user.data);
      dispatch(getUserCurrent({ requestData: { email } }))
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    getUser()

    // provide optional config object (or undefined). Defaults shown.
  }, [])

  return (
    <div className="App">
      <Page />
      <ChatBot />
    </div>
  )
}

export default App
