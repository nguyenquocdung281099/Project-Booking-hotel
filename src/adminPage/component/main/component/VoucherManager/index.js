import './style.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { Tabs, Pagination, Table, Popconfirm, DatePicker } from 'antd'
import InputSearch from '../inputSearch'
import { useState } from 'react'
import { Form, Input } from 'antd'
import {
  addVoucheradmin,
  deleteVoucherdmin,
  getVoucheradmin,
  updateVoucheradmin,
} from '../../../../../redux/action'
import moment from 'moment'
const { TabPane } = Tabs
export default function VoucherManager() {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVoucheradmin({ limit: 10, page: 1 }))
  }, [])

  const { data, meta } = useSelector((state) => state.Voucher)

  const [activeKey, setActiveKey] = useState('1')
  const [idRoom, setidRoom] = useState('')
  const [isEdit, setisEdit] = useState(false)

  const onChange = () => {}
  const columns = [
    {
      title: ' Name',
      dataIndex: 'name',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
    },
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'Expiry Date',
      render: (_, record) => (
        <p style={{ color: `${moment(record.expiryDate) < moment() ? 'red' : 'black'}` }}>
          {moment(record.expiryDate).format('DD-MM-YYYY')}
        </p>
      ),
    },
    {
      title: 'Action',
      render: (_, record) => {
        return (
          <div className="action" id="action">
            <EditOutlined
              onClick={() => {
                onEditRooms(record._id)
                setidRoom(record._id)
              }}
            />

            <Popconfirm
              placement="topLeft"
              title={'you want delete ?'}
              onConfirm={() => onDeleteRoom(record._id)}
              okText="Yes"
              cancelText="No"
            >
              {record.idRole !== '1' && <DeleteOutlined />}
            </Popconfirm>
          </div>
        )
      },
    },
  ]
  console.log(idRoom)
  const onDeleteRoom = (id) => {
    dispatch(deleteVoucherdmin({ id }))
  }

  const onSearch = (value) => {
    dispatch(getVoucheradmin({ limit: 10, page: 1, search: value }))
  }

  const onFinish = (values) => {
    !isEdit
      ? dispatch(addVoucheradmin({ requestData: { ...values } }))
      : dispatch(updateVoucheradmin({ requestData: { ...values }, id: idRoom }))
    setisEdit(false)
    form.resetFields()
  }

  const onEditRooms = (id) => {
    const dataEdit = data.filter((item) => item._id === id)[0]
    form.setFieldsValue({
      ...dataEdit,
      expiryDate: moment(dataEdit.expiryDate),
    })
    setActiveKey('2')
    setisEdit(true)
  }
  return (
    <div className="admin-userManager">
      <Tabs activeKey={activeKey} centered={true} onChange={(key) => setActiveKey(key)}>
        <TabPane tab={<span>Voucher List</span>} key="1">
          <div className="admin-userManager-container">
            <div className="userManager-header">
              <h2>Voucher List</h2>
              <div>
                <InputSearch onSubmit={onSearch} width={'300px'} widthBtn={'100px'} />
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
              bordered={false}
              pagination={false}
            />
            <div className="pagination">
              <Pagination
                defaultCurrent={meta?.page || 1}
                total={meta?.total || 0}
                pageSize={meta?.limit || 10}
                onChange={(page) => dispatch(getVoucheradmin({ limit: 10, page: page }))}
              />
            </div>
          </div>
        </TabPane>
        <TabPane tab={<span>New Voucher</span>} key="2">
          <div className="addUser_tab">
            <h2>Add Voucher</h2>
            <div className="form">
              <Form form={form} name="addRoom" onFinish={onFinish}>
                <Form.Item name="name" rules={[{ required: true }]}>
                  <Input placeholder="name" />
                </Form.Item>
                <Form.Item name="code" rules={[{ required: true }]}>
                  <Input placeholder="code" />
                </Form.Item>
                <Form.Item name="discount" rules={[{ required: true }]}>
                  <Input placeholder="Discount" type={'number'} />
                </Form.Item>
                <Form.Item name="amount" rules={[{ required: true }]}>
                  <Input placeholder="Amount" type={'number'} />
                </Form.Item>
                <Form.Item name={'expiryDate'}>
                  <DatePicker format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item className="form-button">
                  <button type="primary" htmlType="submit">
                    Submit
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
