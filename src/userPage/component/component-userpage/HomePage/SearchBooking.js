import './stylecomponent.css'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterSearchRoom, getBookingRoom } from '../../../../redux/action'
import 'react-datepicker/dist/react-datepicker.css'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'

export default function SearchBooking() {
  const { t } = useTranslation()
  const [dateInfor, setdataInfor] = useState({
    checkin: '',
    checkout: '',
    guest: 2,
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(dispatch(getBookingRoom({})))
  }, [])
  const history = useHistory()
  function handleBtnReservation() {
    localStorage.setItem('dataSearchRoom', JSON.stringify({ ...dateInfor }))
    history.push('/room')
  }

  const url = useRouteMatch()
  return (
    <div className="search__booking mt-5 fade-left row">
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="checkin">{t('Checkin')}</label>
        <input
          type="date"
          id="checkin"
          value={dateInfor.checkin}
          onChange={(e) => {
            setdataInfor({ ...dateInfor, checkin: e.target.value })
          }}
        />
      </div>
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="checkout">{t('Checkout')}</label>
        <input
          type="date"
          id="checkout"
          value={dateInfor.checkout}
          onChange={(e) => {
            setdataInfor({ ...dateInfor, checkout: e.target.value })
          }}
        />
        ;
      </div>
      <div className="form-input col-12 col-lg-6 col-xl-3 mb-2">
        <label htmlFor="guest">{t('guest')}</label>
        <select
          id="guest"
          value={dateInfor.guest}
          onChange={(e) => {
            setdataInfor({ ...dateInfor, guest: e.target.value })
          }}
        >
          <option value="2" selected>
            2
          </option>
          <option value="4">4</option>
        </select>
      </div>
      <div className="form-input search__room--input col-12 col-lg-6 col-xl-3 mb-2">
        <Link
          onClick={() => {
            if (dateInfor.checkin.length !== 0 && dateInfor.checkout.length !== 0) {
              handleBtnReservation()
            }
          }}
          style={{
            cursor: `${
              (dateInfor.checkin.length === 0 || dateInfor.checkout.length === 0) ? 'not-allowed': "pointer"
            }`,
          }}
        >
          {t(' MAKE A RESERVATION')}{' '}
        </Link>
      </div>
    </div>
  )
}

const setDateBooked = (booking) => {
  let holidays = []
  holidays[holidays.length] = parseInt(Date.parse(booking.dateStart))
  while (holidays[holidays.length - 1] < Date.parse(booking.dateEnd)) {
    holidays[holidays.length] = parseInt(holidays[holidays.length - 1]) + 86400000
  }
  return holidays
}
