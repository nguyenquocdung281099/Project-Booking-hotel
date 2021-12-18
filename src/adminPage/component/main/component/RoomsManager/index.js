import './style.scss'
import { Tabs, Pagination, Table } from 'antd'
import InputSearch from '../inputSearch'
import { UserAddOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Form, Input, Button, Select } from 'antd'
const { TabPane } = Tabs

export default function RoomsManager() {
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
        <TabPane tab={<span>Rooms List</span>} key="1">
          <div className="admin-userManager-container">
            <div className="userManager-header">
              <h2>Rooms List</h2>
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
        <TabPane tab={<span>New Room</span>} key="2">
          <div className="addUser_tab">
            <h2>Add Room</h2>
            <div className="form">
              <Form form={form} name="addRoom" onFinish={onFinish}>
                <Form.Item name="name" rules={[{ required: true }]}>
                  <Input placeholder="name" />
                </Form.Item>
                <Form.Item name="number" rules={[{ required: true }]}>
                  <Input placeholder="number" type="number"/>
                </Form.Item>
                <Form.Item name="price Per day" rules={[{ required: true }]}>
                  <Input placeholder=" price Per day" />
                </Form.Item>
                <Form.Item name="description" rules={[{ required: true }]}>
                  <Input placeholder="description" />
                </Form.Item>
                <Form.Item name="image" rules={[{ required: true }]}>
                  <Input placeholder="image 1" />
                </Form.Item>
                <Form.Item name="image" rules={[{ required: true }]}>
                  <Input placeholder="image 2" />
                </Form.Item>
                <Form.Item name="image" rules={[{ required: true }]}>
                  <Input placeholder="image 3" />
                </Form.Item>
                <Form.Item name="image" rules={[{ required: true }]}>
                  <Input placeholder="image 4" />
                </Form.Item>
                <Form.Item name="image" rules={[{ required: true }]}>
                  <Input placeholder="image 5" />
                </Form.Item>
                <Form.Item
                  name="idtyperoom"
                  rules={[{ required: true}]}
                >
                  <Select placeholder="Please select a type">
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
