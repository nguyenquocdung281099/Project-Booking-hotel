import './style.scss'
import { Tabs, Pagination, Table } from 'antd'
import InputSearch from '../inputSearch'
import { UserAddOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Form, Input, Button, Select } from 'antd'
const { TabPane } = Tabs

export default function UsersManager() {
  const [form] = Form.useForm()
  const { Option } = Select;
  const onChange = () => {}
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Chinese Score',
      dataIndex: 'chinese',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: 'Math Score',
      dataIndex: 'math',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: 'English Score',
      dataIndex: 'english',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ]
  const data = [
    {
      key: '1',
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: '2',
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
    },
  ]

  const onSearch = (value) => {
    console.log(value)
  }

  const onFinish = (values) => {
    console.log(values)
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <div className="admin-userManager">
      <Tabs defaultActiveKey="1" centered={true}>
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
            />
            <div className="pagination">
              <Pagination defaultCurrent={1} total={50} />
            </div>
          </div>
        </TabPane>
        <TabPane tab={<span>New User</span>} key="2">
          <div className="addUser_tab">
            <h2>Add User</h2>
            <div className="form">
              <Form form={form} name="addUser" onFinish={onFinish}>
                <Form.Item name="username" rules={[{ required: true }]}>
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
                  <Input placeholder="email" />
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
                        return Promise.reject(
                          'please replace re-password'
                        )
                      },
                    }),
                  ]}
                >
                  <Input placeholder="re-password" type="password" />
                </Form.Item>
                <Form.Item
                  name="idRole"
                  rules={[{ required: true}]}
                >
                  <Select placeholder="Please select a Role">
                    <Option value="1">Admin</Option>
                    <Option value="2">user</Option>
                  </Select>
                </Form.Item>
                <Form.Item className='form-button'>
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
