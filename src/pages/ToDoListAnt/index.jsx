import { useState } from 'react';
import { Row, Input, Button, Card, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Item from './components/Item';

import history from '../../utils/history';

function ToDoListAnt() {
  const [taskList, setTaskList] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const filterTaskList = taskList.filter((task) => {
    return task.title.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1
  })
  
  const [addTaskForm] = Form.useForm();

  function handleAddTask(values) {
    setTaskList([
      values,
      ...taskList,
    ]);
    addTaskForm.resetFields();
  }

  function handleEditTask(values, index) {
    const newTaskList = taskList;
    newTaskList.splice(index, 1, values)
    setTaskList([...newTaskList]);
  }

  function handleDeleteTask(index) {
    const newTaskList = taskList;
    newTaskList.splice(index, 1);
    setTaskList([...newTaskList]);
  }

  function renderTaskList() {
    return filterTaskList.map((taskItem, taskIndex) => {
      return (
        <Item
          key={`${taskIndex}-${taskItem.title}`}
          index={taskIndex}
          title={taskItem.title}
          description={taskItem.description}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      )
    })
  }

  return (
    <div style={{ width: 500, margin: '24px auto' }}>
      <Row justify="space-between">
        <h2>TO DO LIST ANT DESIGN</h2>
        <Button onClick={() => history.push('/to-do-basic')}>Go to Basic</Button>
      </Row>
      <Card title="Add task" size="small">
        <Form
          form={addTaskForm}
          name="create-task"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ title: '', description: '' }}
          onFinish={(values) => handleAddTask(values)}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add
          </Button>
        </Form>
      </Card>
      <Input
        onChange={(e) => setSearchKey(e.target.value)}
        prefix={<SearchOutlined />}
        style={{ margin: '16px 0' }}
      />
      {renderTaskList()}
    </div>
  );
}

export default ToDoListAnt;
