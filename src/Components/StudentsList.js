import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../style/header.css';
import { Modal, Button, Form, Input } from 'antd';

// TODO GTB-工程实践: - 整个文件有Eslint错误
class StudentList extends Component {
  state = { 
    visible: false,
    newStudentName: ''
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  onFinish = values => {
    // TODO GTB-工程实践: - API请求的需要抽取到独立的文件
    fetch('http://localhost:8080/student', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
      method: 'POST',
      mode: 'cors'
    }).then(response => {
      if (response.status === 201) {
        history.go(0);
      }
    });
    this.setState({
      visible: false,
    });
  };

  // TODO GTB-完成度: - 虽然你使用了modal和form实现了添加学生的功能，但是这个与实际的需求不符合，所以这一块的功能算是没有实现需求。
  //  这一点需要注意，到了项目上只有满足了AC和mockup的才算是通过验收的。
  render() {
    return (
      <div className="student-list">
        {
          this.props.dataSource.map(student => {
            return <p className="student-item" key={`student${student.id}`}>{`${student.id}. ${student.name}`}</p>
          })
        }
        <Button onClick={this.showModal} id="add-student-button">
          + 添加学员
        </Button>
        <Modal
          title="添加学员信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form 
            name="basic"
            onFinish={this.onFinish}>
            <Form.Item
              label="学员姓名"
              name="name"
              rules={[{ required: true, message: '姓名不能为空' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default StudentList;