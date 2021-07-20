import { useState } from 'react';
import { Row, Col, Space, Input, Button, Card, Typography, Popconfirm } from 'antd';

function Item(props) {
  const {
    index,
    title,
    description,
    handleEditTask,
    handleDeleteTask,
  } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [editTaskForm, setEditTaskForm] = useState({
    title: title,
    description: description,
  });
  const [editTaskError, setEditTaskError] = useState({
    title: '',
    description: '',
  });

  function handleChangeValue(e) {
    const { name, value } = e.target;
    setEditTaskForm({
      ...editTaskForm,
      [name]: value,
    });
  }

  function handleSubmitEdit(e) {
    let isValid = true;
    let error = {};

    if (!editTaskForm.title) {
      error.title = 'Please input your title!';
      isValid = false;
    } else {
      error.title = '';
    }

    if (!editTaskForm.description) {
      error.description = 'Please input your description!';
      isValid = false;
    } else {
      error.description = '';
    }

    if (isValid) {
      handleEditTask(editTaskForm);
      setIsEdit(false);
    }
    setEditTaskError(error);
  }

  function renderTaskContent() {
    if (isEdit) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Input
            name="title"
            onChange={(e) => handleChangeValue(e)}
            value={editTaskForm.title}
            placeholder="Title..."
          />
          <Typography.Text type="danger" style={{ height: '24px' }}>
            {editTaskError.title}
          </Typography.Text>
          <Input
            name="description"
            onChange={(e) => handleChangeValue(e)}
            value={editTaskForm.description}
            placeholder="Description..."
          />
          <Typography.Text type="danger" style={{ height: '24px' }}>
            {editTaskError.description}
          </Typography.Text>
          <Typography.Text type="danger"></Typography.Text>
          <Row gutter={16}>
            <Col span={12}>
              <Button type="primary" block onClick={() => handleSubmitEdit()}>
                OK
              </Button>
            </Col>
            <Col span={12}>
              <Button htmlType="button" block onClick={() => setIsEdit(false)}>
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      )
    } else {
      return (
        <>
          <div>Title: {title}</div>
          <div>Description: {description}</div>
        </>
      )
    }
  }

  return (
    <Card
      size="small"
      extra={(
        <Space>
          {!isEdit && (
            <Button type="link" onClick={() => {
              setIsEdit(true);
              setEditTaskForm({
                title: title,
                description: description,
              });
              setEditTaskError({ title: '', description: '' })
            }}>
              Edit
            </Button>
          )}
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDeleteTask(index)}
            onCancel={() => null}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )}
      style={{ marginBottom: 24 }}
    >
      {renderTaskContent()}
    </Card>
  );
}

export default Item;
