import { Component } from 'react'
import s from './index.less'
import Collapse from './components/collapse'
import { Avatar, Icon } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const getRandomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`
const issues = {
  backlog: [...Array(5).keys()].map(i => ({
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
  i3: [...Array(7).keys()].map(i => ({
    id: `d${i}`,
    name: `issues-d${i}`,
    bgColor: getRandomColor(),
    color: getRandomColor(),
  })),
}

class Backlog extends Component {
  state = {
    issues,
    iterationExpand: {
      i1: true,
      i2: true,
      i3: true,
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
    ]
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
              issuesNum={issues['backlog'].length}>
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
                  name={iteration.name}
                  issuesNum={issues[iteration.id].length}
                  expand={iterationExpand[iteration.id]}
                  onExpand={() => this.handleExpand(iteration.id)}
                  status={iteration.status}
                  startDate={iteration.startDate}
                  endDate={iteration.endDate}>
                  {this.renderLists(iteration.id)}
                </Collapse>
              ))
            }
          </div>
        </div>
      </DragDropContext>

    )
  }
}

export default Backlog
