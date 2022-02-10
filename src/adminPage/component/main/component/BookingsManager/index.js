import { Pagination, Table, Popconfirm } from 'antd'
import InputSearch from '../inputSearch'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatusBookingAdmin, getbookingAdmin } from '../../../../../redux/action'
import { useEffect } from 'react'
import moment from 'moment'
import { StatusBooking } from '../../../../constant'
import { useTranslation } from 'react-i18next'
import { ta } from 'date-fns/locale'

export default function BookingsManager() {
  const dispatch = useDispatch()
  const { data, meta, loading } = useSelector((state) => state.bookingDB)
  const { NEW, CHECKIN, CHECKOUT, FINISH, CANCEL } = StatusBooking
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(getbookingAdmin({}))
  }, [])
  const dataTable = data.map((item, index) => {
    return {
      ...item,
      key: index,
    }
  })
  const handleNextStatusBooking = (status) => {
    switch (status) {
      case NEW:
        return CHECKIN
      case CHECKIN:
        return CHECKOUT
      case CHECKOUT:
        return FINISH
      default:
        break
    }
  }
  const columns = [
    {
      title: t("User Name"),
      dataIndex: 'userName',
    },
    {
      title: t("Room Name"),
      render: (_, record) => {
        return <>{record?.idroom?.name}</>
      },
    },
    {
      title: t('Checkin'),
      render: (_, record) => <>{moment(record.dateStart).format('DD_MM_YYYY')}</>,
    },
    {
      title: t('Checkout'),
      render: (_, record) => <>{moment(record.dateEnd).format('DD_MM_YYYY')}</>,
    },
    {
      title: t('method payment'),
      dataIndex: 'paymethod',
    },
    {
      title: t('Total cost'),
      dataIndex: 'totalCost',
    },
    {
      title: 'Status',
      render: (_, record) => (
        <>
          <Popconfirm
            placement="topLeft"
            title={`you want change status to ${handleNextStatusBooking(record.status)} ?`}
            disabled={record?.status === FINISH || record?.status === CANCEL}
            onConfirm={() => {
              dispatch(
                changeStatusBookingAdmin({
                  requestData: {
                    id: record._id,
                    status: handleNextStatusBooking(record.status),
                  },
                })
              )
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className={`status ${record.status}`}>{record.status}</button>
          </Popconfirm>

          {record.status === NEW && (
            <Popconfirm
              placement="topLeft"
              title={'you want cancel ?'}
              onConfirm={() => {
                dispatch(
                  changeStatusBookingAdmin({
                    requestData: {
                      id: record._id,
                      status: 'CANCEL',
                    },
                  })
                )
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="cancel">{CANCEL}</button>
            </Popconfirm>
          )}
        </>
      ),
    },
  ]
  const onSearch = (value) => {
    dispatch(getbookingAdmin({ search: value }))
  }
  const onChange = () => {}
  return (
    <div className="admin-userManager">
      <div className="admin-userManager-container">
        <div className="userManager-header">
          <h2>{t("User List")}</h2>
          <div>
            <InputSearch onSubmit={onSearch} width={'300px'} widthBtn={'100px'} />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={dataTable || []}
          onChange={onChange}
          bordered={false}
          pagination={false}
          loading={loading}
        />
        <div className="pagination">
          <Pagination
            defaultCurrent={meta?.page || 1}
            total={meta?.total || 0}
            pageSize={meta?.limit || 10}
            onChange={(page) => dispatch(getbookingAdmin({ limit: 10, page: page }))}
          />
        </div>
      </div>
    </div>
  )
}
