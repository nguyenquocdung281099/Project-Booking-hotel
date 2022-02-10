import './style.css'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getuser, getUserDB } from '../../redux/action'

export default function PrivateRoute({ component: Component, ...rest }) {
  const fakeAuthe = useSelector((state) => state.user.isAuthen)
  console.log(fakeAuthe)

  const dispatch = useDispatch()
  let emailUser = { email: '' }

  useEffect(() => {
    dispatch(getuser(`users?email=${emailUser.email}`))
    dispatch(getUserDB())
    // eslint-disable-next-line
  }, [])

  return (
    <Route
      {...rest}
      render={(props) => (fakeAuthe === true ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  )
}
