import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import './style.scss'
import { Tabs, Pagination, Table, Popconfirm } from 'antd'
import InputSearch from '../inputSearch'
import { useState } from 'react'
import { Form, Input, Rate, Select, Tooltip } from 'antd'
import {
  addRoom,
  delRoom,
  editRoom,
  getAlltypeRoomAdmin,
  getroom,
} from '../../../../../redux/action'
import { isEmpty } from 'lodash'
const { TabPane } = Tabs

export default function UsersManager() {
  const [form] = Form.useForm()
  const { Option } = Select
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getroom({ limit: 10, page: 1 }))
    dispatch(getAlltypeRoomAdmin())
  }, [])

  const { data, meta } = useSelector((state) => state.room.rooms)
  const dataTypeRooms = useSelector((state) => state.typeRooms.data)
  console.log(dataTypeRooms)
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
      title: 'Type',
      render: (_, record) => <>{record?.idtyperoom.name}</>,
    },
    {
      title: 'number',
      dataIndex: 'number',
    },
    {
      title: 'rating',
      render: (_, record) => (
        <>
          <Rate disabled defaultValue={record.rating} />
        </>
      ),
    },
    {
      title: 'price Per day',
      render: (_, record) => <>{record.pricePerday}$</>,
    },
    {
      title: 'description',
      render: (_, record) => (
        <Tooltip placement="topLeft" title={record.description}>
          {' '}
          <div className="description">{record.description}</div>
        </Tooltip>
      ),
      width: 100,
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
    dispatch(delRoom({ id }))
  }

  const onSearch = (value) => {
    dispatch(getroom({ limit: 10, page: 1, search: value }))
  }

  const onFinish = (values) => {
    !isEdit
      ? dispatch(addRoom({ requestData: { ...values, rating: 5 } }))
      : dispatch(editRoom({ requestData: { ...values }, id: idRoom }))
    setisEdit(false)
    form.resetFields()
  }

  const onEditRooms = (id) => {
    const dataEdit = data.filter((item) => item._id === id)[0]
    form.setFieldsValue({
      ...dataEdit,
      image1: dataEdit.image[0],
      image2: dataEdit.image[1],
      image3: dataEdit.image[2],
      image4: dataEdit.image[3],
      image5: dataEdit.image[4],
      idtyperoom: dataEdit.idtyperoom._id,
    })
    setActiveKey('2')
    setisEdit(true)
  }
  return (
    <div className="admin-userManager">
      <Tabs activeKey={activeKey} centered={true} onChange={(key) => setActiveKey(key)}>
        <TabPane tab={<span>User List</span>} key="1">
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
              <Pagination
                defaultCurrent={meta?.page || 1}
                total={meta?.total || 0}
                pageSize={meta?.limit || 10}
                onChange={(page) => dispatch(getroom({ limit: 10, page: page }))}
              />
            </div>
          </div>
        </TabPane>
        <TabPane tab={<span>New Room</span>} key="2">
          <div className="addUser_tab">
            <h2>Add User</h2>
            <div className="form">
              <Form form={form} name="addRoom" onFinish={onFinish}>
                <Form.Item name="name" rules={[{ required: true }]}>
                  <Input placeholder="name" />
                </Form.Item>
                <Form.Item name="number" rules={[{ required: true }]}>
                  <Input placeholder="number" type="number" />
                </Form.Item>
                <Form.Item name="pricePerday" rules={[{ required: true }]}>
                  <Input placeholder=" price Per day" type={'number'} />
                </Form.Item>
                <Form.Item name="description" rules={[{ required: true }]}>
                  <Input placeholder="description" />
                </Form.Item>
                <Form.Item name="image1" rules={[{ required: true }]}>
                  <Input placeholder="image 1" />
                </Form.Item>
                <Form.Item name="image2" rules={[{ required: true }]}>
                  <Input placeholder="image 2" />
                </Form.Item>
                <Form.Item name="image3" rules={[{ required: true }]}>
                  <Input placeholder="image 3" />
                </Form.Item>
                <Form.Item name="image4" rules={[{ required: true }]}>
                  <Input placeholder="image 4" />
                </Form.Item>
                <Form.Item name="image5" rules={[{ required: true }]}>
                  <Input placeholder="image 5" />
                </Form.Item>
                <Form.Item name="idtyperoom" rules={[{ required: true }]}>
                  <Select placeholder="Please select a type">
                    {!isEmpty(dataTypeRooms) &&
                      dataTypeRooms.map((item, index) => {
                        return (
                          <Option key={index} value={item._id}>
                            {item.name}
                          </Option>
                        )
                      })}
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
