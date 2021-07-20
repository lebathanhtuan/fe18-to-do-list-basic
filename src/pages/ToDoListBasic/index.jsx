import { useState } from 'react';
import { Row, Input, Button, Card, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Item from './components/Item';

import history from '../../utils/history';

function ToDoListBasic() {
  const [taskList, setTaskList] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const [addTaskForm, setAddTaskForm] = useState({
    title: '',
    description: '',
  });
  const [addTaskError, setAddTaskError] = useState({
    title: '',
    description: '',
  });

  const filterTaskList = taskList.filter((task) => {
    return task.title.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1
  })

  function handleChangeValue(e) {
    const { name, value } = e.target;
    setAddTaskForm({
      ...addTaskForm,
      [name]: value,
    });
  }

  function handleAddTask() {
    let isValid = true;
    let error = {};

    if (!addTaskForm.title) {
      error.title = 'Please input your title!';
      isValid = false;
    } else {
      error.title = '';
    }

    if (!addTaskForm.description) {
      error.description = 'Please input your description!';
      isValid = false;
    } else {
      error.description = '';
    }

    if (isValid) {
      setTaskList([
        {
          title: addTaskForm.title,
          description: addTaskForm.description,
        },
        ...taskList,
      ]);
      setAddTaskForm({ title: '', description: '' })
    }
    setAddTaskError(error);
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
        <h2>TO DO LIST ANT BASIC</h2>
        <Button onClick={() => history.push('/')}>Go to AntD</Button>
      </Row>
      <Card title="Add task" size="small">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Input
            name="title"
            onChange={(e) => handleChangeValue(e)}
            value={addTaskForm.title}
            placeholder="Title..."
          />
          <Typography.Text type="danger" style={{ height: '24px' }}>
            {addTaskError.title}
          </Typography.Text>
          <Input
            name="description"
            onChange={(e) => handleChangeValue(e)}
            value={addTaskForm.description}
            placeholder="Description..."
          />
          <Typography.Text type="danger" style={{ height: '24px' }}>
            {addTaskError.description}
          </Typography.Text>
          <Typography.Text type="danger"></Typography.Text>
          <Button type="primary" block onClick={() => handleAddTask()}>
            Add
          </Button>
        </div>
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

export default ToDoListBasic;
