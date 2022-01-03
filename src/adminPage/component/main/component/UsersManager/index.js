import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import './style.scss'
import { Tabs, Pagination, Table, Popconfirm } from 'antd'
import InputSearch from '../inputSearch'
import { UserAddOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { addUser, delUserDB, editUser, getUserAdmin } from '../../../../../redux/action'
const { TabPane } = Tabs

export default function UsersManager() {
  const [form] = Form.useForm()
  const { Option } = Select
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserAdmin({ limit: 10, page: 1 }))
  }, [])

  const { data, meta,loading } = useSelector((state) => state.userDB)

  const [activeKey, setActiveKey] = useState('1')
  const [isEdit, setisEdit] = useState(false)

  const onChange = () => {}
  const columns = [
    {
      title: 'full Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Role',
      render: (_, record) => <>{record.idRole === '1' ? 'Admin' : 'User'}</>,
    },
    {
      title: 'Action',
      render: (_, record) => {
        return (
          <div className="action" id="action">
            <EditOutlined onClick={() => onEditUsers(record._id)} />

            <Popconfirm
              placement="topLeft"
              title={'you want delete ?'}
              onConfirm={() => onDeleteUser(record._id)}
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

  const onDeleteUser = (id) => {
    dispatch(delUserDB({ id: id }))
  }

  const onSearch = (value) => {
    dispatch(getUserAdmin({ limit: 10, page: 1, search: value}))
  }

  const onFinish = (values) => {
    !isEdit
      ? dispatch(addUser({ requestData: { ...values } }))
      : dispatch(editUser({ requestData: { ...values } }))
    setisEdit(false)
    form.resetFields()
  }

  const onEditUsers = (id) => {
    const dataEdit = data.filter((item) => item._id === id)[0]
    form.setFieldsValue({ ...dataEdit })
    setActiveKey('2')
    setisEdit(true)
  }
  return (
    <div className="admin-userManager">
      <Tabs activeKey={activeKey} centered={true} onChange={(key) => setActiveKey(key)}>
        <TabPane tab={<span>User List</span>} key="1">
          <div className="admin-userManager-container">
            <div className="userManager-header">
              <h2>User List</h2>
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
              loading={loading}
            />
            <div className="pagination">
              <Pagination
                defaultCurrent={meta?.page || 1}
                total={meta?.total || 0}
                pageSize={meta?.limit || 10}
                onChange={(page) => dispatch(getUserAdmin({ limit: 10, page: page }))}
              />
            </div>
          </div>
        </TabPane>
        <TabPane tab={<span>New User</span>} key="2">
          <div className="addUser_tab">
            <h2>Add User</h2>
            <div className="form">
              <Form form={form} name="addUser" onFinish={onFinish}>
                <Form.Item name="userName" rules={[{ required: true }]}>
                  <Input placeholder="UserName" />
                </Form.Item>
                <Form.Item name="fullName" rules={[{ required: true }]}>
                  <Input placeholder="fullName" />
                </Form.Item>
                <Form.Item name="phone" rules={[{ required: true }]}>
                  <Input placeholder="Number Phone" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[{ required: true }, { type: 'email', message: 'please format email' }]}
                >
                  <Input placeholder="email" disabled={isEdit} />
                </Form.Item>
                <Form.Item name="address" rules={[{ required: true }]}>
                  <Input placeholder="address" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true }]}>
                  <Input placeholder="password" type="password" />
                </Form.Item>
                <Form.Item
                  name="re-password"
                  rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject('please replace re-password')
                      },
                    }),
                  ]}
                >
                  <Input placeholder="re-password" type="password" />
                </Form.Item>
                <Form.Item name="idRole" rules={[{ required: true }]}>
                  <Select placeholder="Please select a Role">
                    <Option value="1">Admin</Option>
                    <Option value="2">user</Option>
                  </Select>
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
