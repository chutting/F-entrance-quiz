import React, { Component } from 'react';
import GroupsList from './GroupsList';
import '../style/header.css';
// TODO GTB-工程实践: - 文件有Eslint error
// TODO GTB-工程实践: - 组件的命名（Header）没有体现业务逻辑
class Header extends Component {
  state = {
    groupingStudentList : [],
    groupListVisible: false
  }

  handleGrouping = () => {
    // TODO GTB-工程实践: - 与API相关的代码需要抽取到独立的文件里面
    fetch('http://localhost:8080/grouping', {
      method: 'GET',
      mode: 'cors'
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      }
    }).then(data => {
      this.setState({
        groupingStudentList: data,
        groupListVisible: true
      })
    });
  }


  render() {
    return <div className="container">
      <div className="group-list-header">
        <p>分组列表</p>
        <button type="submit" className="grouping-button" onClick={this.handleGrouping}>分组学员</button>
      </div>
      {/* // TODO GTB-工程实践: - props的命名（dataSource）没有体现业务逻辑 */}
      <GroupsList dataSource={this.state.groupingStudentList} visible={this.state.groupListVisible} />
    </div>
  }
}

export default Header;