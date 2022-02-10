import Chart from 'react-apexcharts'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  EllipsisOutlined,
  ArrowRightOutlined,
  SearchOutlined,
  RestOutlined,
  UserOutlined,
} from '@ant-design/icons'
import ReactLoading from 'react-loading'

import './style.scss'
import { Avatar } from 'antd'
import CircleChart from './component/ApexChartCircle'
import { getCommentAdmin, getDataMaster, getUserAdmin } from '../../../../../redux/action'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

export default function Dashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDataMaster())
    dispatch(
      getUserAdmin({
        limit: 5,
        page: 1,
      })
    )
    dispatch(
      getCommentAdmin({
        limit: 5,
        page: 1,
      })
    )
  }, [dispatch])

  const masterData = useSelector((state) => state.Dashboard.dataMaster)
  const loading = useSelector((state) => state.Dashboard.loading)
  const listUser = useSelector((state) => state.userDB.data)
  const listComment = useSelector((state) => state.comments.comment)

  const { t } = useTranslation()
  const series = masterData?.dataChart || [
    {
      name: 'TEAM A',
      type: 'column',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'TEAM B',
      type: 'area',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'TEAM C',
      type: 'line',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]
  var options = {
    chart: {
      type: 'line',
      stacked: false,
    },
    stroke: {
      width: [0, 5, 1],
      curve: 'smooth',
    },

    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: 'vertical',
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },

      colors: ['#893DD9', '#F7F8F9', '#9C27B0'],
    },
    labels: [
      '01/01/2021',
      '02/01/2021',
      '03/01/2021',
      '04/01/2021',
      '05/01/2021',
      '06/01/2021',
      '07/01/2021',
      '08/01/2021',
      '09/01/2021',
      '10/01/2021',
      '11/01/2021',
    ],
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Points',
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== 'undefined') {
            return y.toFixed(0) + ' points'
          }
          return y
        },
      },
    },
  }

  const statisticsData = [
    {
      icon: 'https://demo.dashboardpack.com/user-management-html/img/crm/businessman.svg',
      label: t('Users Registrations'),
      acount: masterData?.dataStatic?.totalUsers,
    },
    {
      icon: 'https://demo.dashboardpack.com/user-management-html/img/crm/customer.svg',
      label: t('Total Rooms'),
      acount: masterData?.dataStatic?.totalRooms,
    },
    {
      icon: 'https://demo.dashboardpack.com/user-management-html/img/crm/infographic.svg',
      label: t('Total Bookings'),
      acount: masterData?.dataStatic?.totalBookings,
    },
    {
      icon: 'https://demo.dashboardpack.com/user-management-html/img/crm/sqr.svg',
      label: t('Total Extra Service'),
      acount: masterData?.dataStatic?.totalService,
    },
  ]

  const dataRecent = [2, 3, 4, 5]
  const titleSale = [
    {
      icon: 'https://demo.dashboardpack.com/user-management-html/img/icon2/7.svg',
      label: t('Most Sales'),
      content: t('Authors with the best sales'),
    },
    {
      icon: 'https://demo.dashboardpack.com/user-management-html/img/icon2/6.svg',
      label: t('Total sales lead'),
      content: t('increased on week-to-week reports'),
    },
    {
      icon: 'https://demo.dashboardpack.com/user-management-html/img/icon2/5.svg',
      label: t('Average Bestseller'),
      content: t('Pitstop Email Marketing'),
    },
  ]
  return (
    <>
      {loading ? (
        <div className="loading">
          <ReactLoading type={'bars'} color={'#C388F6'} height={100} width={375} />
        </div>
      ) : (
        <div className="dashboard-admin">
          <div className="dashboard-block1">
            <div className="chart-main">
              <Chart options={options} series={series} width={'100%'} height={'100%'} />
            </div>
            <div className="chart-statistics">
              <div className="chart-statistics-main">
                {statisticsData.map((item, index) => {
                  return (
                    <div className="chart-statistics-item">
                      <div className={`static-item_header static-header-${index}`}>
                        <img src={item.icon} alt="thumb" />
                        <EllipsisOutlined />
                      </div>
                      <div className="static-item_content">
                        <h1>{item.acount}</h1>
                        <h3>{item.label}</h3>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="chart-statistics-abs">
                <div>
                  <h1>{t("Create CRM Reports")}</h1>
                  <p>
                    {t("Outlines keep you and honest")} <br /> {t("indulging honest")}
                  </p>
                  <a href="#">
                    Read More <ArrowRightOutlined />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="dasboard-block2">
            <div className="newuser block2-item">
              <div className="newuser-header">
                <h1 className="newUser-title">{t("New Users")}</h1>
                <div className="newuser-title_search">
                  <input type="text" className="search-user" placeholder="Search..." />
                  <button type="submit">
                    <SearchOutlined />
                  </button>
                </div>
              </div>
              <div className="newuser-main">
                {!isEmpty(listUser) &&
                  listUser.map((item) => (
                    <div className="inforuser-item">
                      <div className="name">
                        <Avatar src={item.Avatar || 'https://joeschmoe.io/api/v1/random'} />
                        <h3>{item.fullName}</h3>
                      </div>
                      <div className="Role">{item.idRole === '1' ? 'Admin' : 'User'}</div>
                      <div className="action">
                        <RestOutlined />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="sale block2-item">
            <h1 className="Static-title">{t("Static Comment")}</h1>
              <CircleChart />
              <div className="sale-desc">
                {titleSale.map((item, ind) => {
                  return (
                    <div className="sale-desc_item" key={ind}>
                      <img src={item.icon} alt="thumb" />
                      <div className="content">
                        <h1 className="label">{item.label}</h1>
                        <h3>{item.content}</h3>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="Recent block2-item">
              <div className="Recent-header">
                <h1 className="Recent-title">{t("Recent activity")}</h1>
                <EllipsisOutlined />
              </div>
              <div className="Recent-contain">
                {isEmpty(listComment.data) ||
                  listComment.data.map((item) => {
                    return (
                      <div className="Recent-contain_item">
                        <div className={`circle ${item.evaluate}`}></div>
                        <div className="contain">
                          <div className="Recent-time">
                            {moment(item.createAt).format('YYYY/MM/DD')}
                          </div>
                          <div className="Recent-content">{item.content}</div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
