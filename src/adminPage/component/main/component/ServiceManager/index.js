import './style.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { Tabs, Pagination, Table, Popconfirm } from 'antd'
import InputSearch from '../inputSearch'
import { useState } from 'react'
import { Form, Input } from 'antd'
import {
  addService,
  deleteServiceAdmin,
  getServiceAdmin,
  updateServiceAdmin,
} from '../../../../../redux/action'
const { TabPane } = Tabs
export default function ServiceManager() {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getServiceAdmin({ limit: 10, page: 1 }))
  }, [])

  const { data, meta } = useSelector((state) => state.serviceAdmin)
  console.log(data)

  const [activeKey, setActiveKey] = useState('1')
  const [idRoom, setidRoom] = useState('')
  const [isEdit, setisEdit] = useState(false)
  const dataTable =
    data?.map((item, index) => {
      return { ...item, key: index }
    }) || []
  const onChange = () => {}
  const columns = [
    {
      title: ' Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
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
  const onDeleteRoom = (id) => {
    dispatch(deleteServiceAdmin({ id }))
  }

  const onSearch = (value) => {
    dispatch(getServiceAdmin({ limit: 10, page: 1, search: value }))
  }

  const onFinish = (values) => {
    !isEdit
      ? dispatch(addService({ requestData: { ...values } }))
      : dispatch(updateServiceAdmin({ requestData: { ...values }, id: idRoom }))
    setisEdit(false)
    form.resetFields()
  }

  const onEditRooms = (id) => {
    const dataEdit = data.filter((item) => item._id === id)[0]
    form.setFieldsValue({
      ...dataEdit,
    })
    setActiveKey('2')
    setisEdit(true)
  }
  return (
    <div className="admin-userManager">
      <Tabs activeKey={activeKey} centered={true} onChange={(key) => setActiveKey(key)}>
        <TabPane tab={<span>Sevice List</span>} key="1">
          <div className="admin-userManager-container">
            <div className="userManager-header">
              <h2>Sevice List</h2>
              <div>
                <InputSearch onSubmit={onSearch} width={'300px'} widthBtn={'100px'} />
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={dataTable}
              onChange={onChange}
              bordered={false}
              pagination={false}
            />
            <div className="pagination">
              <Pagination
                defaultCurrent={meta?.page || 1}
                total={meta?.total || 0}
                pageSize={meta?.limit || 10}
                onChange={(page) => dispatch(getServiceAdmin({ limit: 10, page: page }))}
              />
            </div>
          </div>
        </TabPane>
        <TabPane tab={<span>New Service</span>} key="2">
          <div className="addUser_tab">
            <h2>Add Sevice</h2>
            <div className="form">
              <Form form={form} name="addRoom" onFinish={onFinish}>
                <Form.Item name="name" rules={[{ required: true }]}>
                  <Input placeholder="name" />
                </Form.Item>
                <Form.Item name="price" rules={[{ required: true }]}>
                  <Input placeholder=" Price" type={'number'} />
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
