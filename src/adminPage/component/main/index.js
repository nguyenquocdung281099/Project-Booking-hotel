import moment from 'moment'
import { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CalendarOutlined } from '@ant-design/icons'

import BookingsManager from './component/BookingsManager'
import Dashboard from './component/Dashboard'
import RoomsManager from './component/RoomsManager'
import './style.scss'
import UsersManager from './component/UsersManager'


export default function AdminMain() {
  return (
    <div className="AdminMain">
      <header>
        <div className="header-left">
          <h1 className="Adminmain_title">Dashboard</h1>
          <div className="address">
            <h3>Admin / Dashboard</h3>
          </div>
        </div>
        <div className="header-right">
          <span>
            <CalendarOutlined />
            {moment().format('MMMM Do YYYY, h:mm:ss a')}
          </span>
        </div>
      </header>
      <Switch>
        <Route exact path={'/admin'} component={Dashboard} />
        <Route path="/admin/bookings" component={BookingsManager} />
        <Route path="/admin/rooms" component={RoomsManager} />
        <Route path="/admin/bookings" component={BookingsManager} />
        <Route path="/admin/users" component={UsersManager} />
      </Switch>
    </div>
  )
}
