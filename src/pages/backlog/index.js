import { Component } from 'react'
import s from './index.less'
import Collapse from './components/collapse'
import AddIterContainer from './components/add-iter-container'
import DrawContainer from '../../components/drawer_container'
import { Avatar, Icon, message } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FixedSizeList } from 'react-window'

const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
const issues = {
  backlog: [...Array(6).keys()].map(i => ({
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
    name: `issues-e${i}`,
    bgColor: getRandomColor(),
    color: getRandomColor(),
  })),
  i5: [...Array(0).keys()].map(i => ({
    id: `f${i}`,
    name: `issues-f${i}`,
    bgColor: getRandomColor(),
    color: getRandomColor(),
  }))
}

class Backlog extends Component {
  state = {
    issues,
    iterationExpand: {
      i1: true
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
    ],
    drawerVisible: false,
    itemId: null
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

  handleAddIter = title => {
    let id, newIter
    const newIterations = JSON.parse(JSON.stringify(this.state.iterations))
    const newIssues = JSON.parse(JSON.stringify(this.state.issues))
    id = 'i' + newIterations.length + 1
    newIter = { id, name: title, status: 0, startDate: '2020/02/01', endDate: '2020/02/16' }
    newIterations.push(newIter)
    this.setState({ iterations: newIterations })
    newIssues[id] = []
    this.setState({ issues: newIssues })
  }

  handleExpand = id => {
    const { iterationExpand } = this.state
    iterationExpand[id] = !iterationExpand[id]
    this.setState({ iterationExpand })
  }

  // showDetail = eachItem => {
  //   // this.props.history.push(`/detail/${eachItem.id}`)
  //   this.props.history.push({ pathname: `/detail/${eachItem.id}`, state: { name: eachItem.name } })
  // }

  showDrawer = eachItem => {
    this.setState({ itemId: eachItem.id })
    this.setState({ drawerVisible: true })
  }

  closeDrawer = () => this.setState({ drawerVisible: false })

  renderList = (list, provided, isDragging, style) => {
    return (
      <div
        className={s.list}
        onClick={() => this.showDrawer(list)}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          boxShadow: isDragging && '0 8px 24px 0 rgba(0, 0, 0, 0.15), 0 0 1px 0 rgba(0, 0, 0, 0.05)',
          borderBottom: isDragging && 'none',
          ...provided.draggableProps.style,
          ...style,
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

  renderLists = (droppableId) => {
    const { issues } = this.state
    const lists = issues[droppableId]

    return (
      <Droppable droppableId={droppableId}>
        {
          (droppableProvided) => lists.length ? (
            <div className={s.lists} ref={droppableProvided.innerRef}>
              {
                lists.map((list, index) => (
                  <Draggable draggableId={list.id} index={index} key={list.id}>
                    {
                      (draggableProvided, draggableSnapshot) => this.renderList(list, draggableProvided, draggableSnapshot.isDragging)
                    }
                  </Draggable>
                ))
              }
              {droppableProvided.placeholder}
            </div>
          ) : (
              <div className={s.mainEmpty} ref={droppableProvided.innerRef}>
                <span>从Backlog中拖动需求事项到此处进行分类</span>
              </div>
            )
        }
      </Droppable>
    )
  }

  handleDragEnd = (result, a) => {
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
      <>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <div className={s.wrapper}>
            <div className={s.backlog}>
              <Collapse
                type='backlog'
                name='Backlog'
                issuesNum={issues['backlog'].length}
                handleAdd={this.handleAdd}>
                <div className={s.backlogBox}>
                  {this.renderLists('backlog')}
                  {/* <Droppable
                droppableId='backlog'
                mode='virtual'
                renderClone={(provided, snapshot, rubric) => this.renderList(issues['backlog'][rubric.source.index], provided, snapshot.isDragging)}
              >
                {
                  droppableProvided => (
                    <FixedSizeList
                      outerRef={droppableProvided.innerRef}
                      width={400}
                      height={400}
                      itemCount={issues['backlog'].length}
                      itemSize={60}
                      itemData={issues['backlog']}>
                      {
                        ({data, index, style}) => (
                          <Draggable draggableId={data[index].id} index={index} key={data[index].id}>
                            {
                              (draggableProvided, draggableSnapshot) => this.renderList(data[index], draggableProvided, draggableSnapshot.isDragging, style)
                            }
                          </Draggable>
                        )
                      }
                    </FixedSizeList>
                  )
                }
              </Droppable> */}
                </div>
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
                <AddIterContainer handleAddIter={this.handleAddIter} />
              </div>
            </div>
          </div>
        </DragDropContext>
        {
          this.state.drawerVisible &&
          <DrawContainer
            id={this.state.itemId}
            visible={this.state.drawerVisible}
            closeDrawer={this.closeDrawer} />
        }
      </>
    )
  }
}

export default Backlog
