import { Component } from 'react'
import s from './index.less'
import Collapse from './components/collapse'
import AddIterContainer from './components/add-iter-container'
import { Avatar, Icon, message } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
const issues = {
  backlog: [...Array(8).keys()].map(i => ({
    id: `a${i}`,
    name: `issues-a${i}`,
    bgColor: getRandomColor(),
    color: getRandomColor(),
  })),
  i1: [...Array(6).keys()].map(i => ({
    id: `b${i}`,
    name: `issues-b${i}`,
    bgColor: getRandomColor(),
    color: getRandomColor(),
  })),
  i2: [...Array(3).keys()].map(i => ({
    id: `c${i}`,
    name: `issues-c${i}`,
    bgColor: getRandomColor(),
    color: getRandomColor(),
  })),
  i3: [...Array(3).keys()].map(i => ({
    id: `d${i}`,
    name: `issues-d${i}`,
    bgColor: getRandomColor(),
    color: getRandomColor(),
  })),
  i4: [...Array(2).keys()].map(i => ({
    id: `e${i}`,
    name: `issues-d${i}`,
    bgColor: getRandomColor(),
    color: getRandomColor(),
  })),
  i5: [...Array(0).keys()].map(i => ({
    id: `e${i}`,
    name: `issues-d${i}`,
    bgColor: getRandomColor(),
    color: getRandomColor(),
  }))
}

class Backlog extends Component {
  state = {
    issues,
    iterationExpand: {
      i1: true,
      i2: false,
      i3: false,
      i4: false
    },
    iterations: [
      {
        id: 'i1',
        name: '[PC] 广告平台',
        status: 0,
        startDate: '2020/02/01',
        endDate: '2020/02/16',
      },
      {
        id: 'i2',
        name: '[Mobile] 手机版微店',
        status: 1,
        startDate: '2020/02/01',
        endDate: '2020/02/16',
      },
      {
        id: 'i3',
        name: '[PC] 宠物商店',
        status: 0,
        startDate: '2020/02/01',
        endDate: '2020/02/16',
      },
      {
        id: 'i4',
        name: '[Mobile] 钓鱼市场',
        status: 0,
        startDate: '2020/02/01',
        endDate: '2020/02/16',
      },
      {
        id: 'i5',
        name: '[PC] 空',
        status: 0,
        startDate: '2020/02/01',
        endDate: '2020/02/16',
      },
    ]
  }

  handleAdd = ({ iterContainerId, type, itemTitle }) => {
    let id, name, newItem
    let newData = JSON.parse(JSON.stringify(this.state.issues))
    if (iterContainerId && type === 'iteration') {
      id = 'new' + newData[iterContainerId].length
      name = 'issues-new-' + itemTitle
      newItem = { id, name, bgColor: getRandomColor(), color: getRandomColor() }
      newData[iterContainerId].push(newItem)
    } else {
      id = 'new' + newData[type].length
      name = 'issues-new-' + itemTitle
      newItem = { id, name, bgColor: getRandomColor(), color: getRandomColor() }
      newData[type].push(newItem)
    }
    this.setState({ issues: newData })
    message.success('更新成功')
  }

  handleExpand = id => {
    const { iterationExpand } = this.state

    iterationExpand[id] = !iterationExpand[id]
    this.setState({ iterationExpand })
  }

  renderLists = (droppableId) => {
    const { issues } = this.state
    const lists = issues[droppableId]

    return (
      <Droppable droppableId={droppableId}>
        {
          (droppableProvided) => (
            <div className={s.lists} ref={droppableProvided.innerRef}>
              {
                lists.map((list, index) => (
                  <Draggable draggableId={list.id} index={index} key={list.id}>
                    {
                      (draggableProvided, draggableSnapshot) => (
                        <div
                          className={s.list}
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          style={{
                            boxShadow: draggableSnapshot.isDragging && '0 8px 24px 0 rgba(0, 0, 0, 0.15), 0 0 1px 0 rgba(0, 0, 0, 0.05)',
                            borderBottom: draggableSnapshot.isDragging && 'none',
                            ...draggableProvided.draggableProps.style,
                          }}>
                          <div className={s.listTitle}>{list.name}</div>
                          <div className={s.listExtra}>
                            <div className={s.listCode}>
                              <Icon type="filter" theme="twoTone" />&nbsp;#{list.id}
                            </div>
                            <Avatar
                              size='small'
                              icon='user'
                              style={{
                                background: list.bgColor,
                                color: list.color,
                              }}>
                              {list.name}
                            </Avatar>
                          </div>
                        </div>
                      )
                    }
                  </Draggable>
                ))
              }
              {droppableProvided.placeholder}
            </div>
          )
        }
      </Droppable>
    )
  }

  handleDragEnd = result => {
    if (!result.destination) {
      return
    }

    const { droppableId: sourceDroppableId, index: sourceDroppableIndex } = result.source
    const { droppableId: targeDroppableId, index: targetDroppableIndex } = result.destination

    if (sourceDroppableId === targeDroppableId && sourceDroppableIndex === targetDroppableIndex) {
      return
    }
    const { issues } = this.state

    if (sourceDroppableId === targeDroppableId) {
      const curArray = issues[sourceDroppableId]

      const cur = curArray.splice(sourceDroppableIndex, 1)[0]
      curArray.splice(targetDroppableIndex, 0, cur)
      issues[sourceDroppableId] = curArray
    } else {
      const curArray1 = issues[sourceDroppableId]
      const curArray2 = issues[targeDroppableId]

      const cur = curArray1.splice(sourceDroppableIndex, 1)[0]
      curArray2.splice(targetDroppableIndex, 0, cur)
      issues[sourceDroppableId] = curArray1
      issues[targeDroppableId] = curArray2
    }

    this.setState({ issues });
  }

  render() {
    const { issues, iterations, iterationExpand } = this.state

    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <div className={s.wrapper}>
          <div className={s.backlog}>
            <Collapse
              type='backlog'
              name='Backlog'
              issuesNum={issues['backlog'].length}
              handleAdd={this.handleAdd}>
              {this.renderLists('backlog')}
            </Collapse>
          </div>
          <div className={s.iteration}>
            {
              iterations.map(iteration => (
                <Collapse
                  key={iteration.id}
                  className={s.collapse}
                  type='iteration'
                  iterContainerId={iteration.id}
                  name={iteration.name}
                  issuesNum={issues[iteration.id].length}
                  expand={iterationExpand[iteration.id]}
                  onExpand={() => this.handleExpand(iteration.id)}
                  status={iteration.status}
                  startDate={iteration.startDate}
                  endDate={iteration.endDate}
                  handleAdd={this.handleAdd}>
                  {this.renderLists(iteration.id)}
                </Collapse>
              ))
            }
            <div className={s.addContainer}>
              <AddIterContainer />
            </div>
          </div>
        </div>
      </DragDropContext>
    )
  }
}

export default Backlog
