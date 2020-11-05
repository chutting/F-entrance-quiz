import React, { Component } from 'react';
import './App.scss';
import Header from '../Components/Header'
import StudentList from '../Components/StudentsList';

class App extends Component {
  state = {
    studentList: []
  }

  componentDidMount() {
    // TODO GTB-工程实践: - API相关的代码需要抽取到一个公共的文件
    fetch('http://localhost:8080/students', {
      method: 'GET',
      mode: 'cors'
    }).then(response => {
      // TODO GTB-知识点: - 这里只在200的情况下才return 数据，那如果不是200呢,return的又是什么值？ 在非200的情况下，你的第二个then()里面又会发生什么呢？
      if (response.status === 200) {
        return response.json();
      }
    }).then(data => {
      this.setState({
        studentList: data
      })
    });
  }

  render() {
    return (
      <div className="main-container">
        <Header dataSource={this.state.studentList}/>
        <StudentList dataSource={this.state.studentList}/>
      </div>
    );
  }
}

export default App;
