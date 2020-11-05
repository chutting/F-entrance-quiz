import React, { Component } from 'react';
// TODO GTB-工程实践: - 文件有Eslint error
// TODO GTB-工程实践: - GroupsList的命名不合理，要么叫Groups,要么叫GroupList
class GroupsList extends Component {
  state = {
    groupList: []
  }

  componentDidMount() {
    // TODO GTB-工程实践: - 与API相关的代码需要抽取到独立的文件里面
    fetch('http://localhost:8080/groups', {
      method: 'GET',
      mode: 'cors'
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      }
    }).then(data => {
      this.setState({
        groupList: data
      })
    });
  }

  render() {
    // TODO GTB-工程实践: - 单词拼写错误visble
    return <div className={this.props.visible ? "group-list-visble" : "group-list-unvisble"}>
      {
        // TODO GTB-知识点: - 没有使用列表标签ul和li
        this.state.groupList.map(group => {
          return (<div key={`group${group}`} className="group-container">
            <p className="group-name">{`${group} 组`}</p>
            <div className="student-group-container">
              {
                // TODO GTB-知识点: - 正确的数据结构是：你的分组API应该把每个组包含的学员列表也返回来，这样就不需要在这里做filter了。
                  // TODO GTB-知识点: - map里面套map，其实就是已经在提示你，需要再抽取一层Group组件了
                this.props.dataSource.filter(student => student.group === group).map(student => {
                  return <p key={`student${student.id}`} className="student-item">{`${student.id}. ${student.name}`}</p>
                })
              }
            </div>
          </div>)
        })
      }
    </div>
  }
}

export default GroupsList;