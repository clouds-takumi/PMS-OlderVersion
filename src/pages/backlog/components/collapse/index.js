import { useState } from 'react'
import s from './index.less'
import { Icon, Tag, Dropdown, Menu, Divider, Tooltip } from 'antd'
import cn from 'classnames'

const Collapse = ({
  className,
  children,
  type,
  iterContainerId = null,
  name,
  issuesNum,
  expand,
  onExpand,
  status,
  startDate,
  endDate,
  handleAdd,
}) => {
  const [addFlag, setAddFlag] = useState(false)
  const [addValueFlag, setAddValueFlag] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const changeAddFlag = () => { setAddFlag(true) }
  const handleCancel = () => {
    setInputValue('')
    setAddFlag(false)
    setAddValueFlag(false)
  }

  let curponiter = addValueFlag ? 'pointer' : 'not-allowed'
  let curcolor = addValueFlag ? '#4682B4' : '#bcc0c5'
  const cur = { cursor: curponiter, backgroundColor: curcolor, color: "white" }

  const handleInput = (e) => {
    setInputValue(e.target.value)
    setAddValueFlag(true)
    if (!e.target.value) {
      setAddValueFlag(false)
    }
  }

  const handleBtnAdd = (e) => {
    if (!!inputValue) {
      const item = { iterContainerId, type, itemTitle: inputValue }
      handleAdd(item)
      setInputValue('')
      setAddValueFlag(false)
    }
  }

  const handleEnterAdd = (e) => {
    if ((e.keyCode === 13) && !!inputValue) {
      const item = { iterContainerId, type, itemTitle: inputValue }
      handleAdd(item)
      setInputValue('')
      setAddValueFlag(false)
    }
  }

  const handleExpand = () => {
    if (typeof onExpand === 'function') {
      onExpand()
    }
  }

  const dropDownMenu = (
    <Menu>
      <Menu.Item key='0'>开始迭代</Menu.Item>
      <Menu.Divider />
      <Menu.Item key='1'>在新标签页打开</Menu.Item>
      <Menu.Item key='2'>编辑迭代</Menu.Item>
      <Menu.Divider />
      <Menu.Item key='3'>删除迭代</Menu.Item>
    </Menu>
  )

  const renderAddMenu = () => {
    return (
      <div className={s.addRoot}>
        <div className={s.addItemContainer}>
          <span className={s.addMenu}>add</span>
          <input
            placeholder="输入事件标题，可按回车创建"
            onChange={handleInput}
            value={inputValue}
            onKeyUp={handleEnterAdd}
            className={s.addItemInput}
          />
          <div className={s.btn} style={cur} onClick={handleBtnAdd}>创建</div>
          <div className={s.btn} onClick={() => handleCancel()} >取消</div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(s.collapse, className)}>
      <div
        className={cn(s.header, type !== 'backlog' && s.headerExpand)}
        onClick={handleExpand}>
        {
          type === 'backlog'
            ? <Icon type='hdd' className={s.icon} />
            : <Icon type={expand ? 'down' : 'right'} className={s.icon} />
        }
        <span className={s.name}>{name}</span>
        <span className={s.issuesNum}>{issuesNum}个事项</span>
        <Divider type="vertical" />
        {
          type === 'backlog'
            ? (
              <Tooltip title='未规划进迭代并且未完成的事项'>
                <Icon type="question-circle" theme='filled' />
              </Tooltip>
            )
            : (
              <div className={s.headerRight}>
                <Dropdown overlay={dropDownMenu} trigger={['click']}>
                  <Icon type='ellipsis' onClick={e => e.stopPropagation()} />
                </Dropdown>
                <div className={s.date}>
                  {startDate} - {endDate}
                </div>
                <Tag color={status ? 'orange' : 'blue'}>
                  {status ? '进行中' : '未开始'}
                </Tag>
              </div>
            )
        }
      </div>
      <div className={s.body}>
        {(type === 'backlog') && issuesNum === 0 && (
          <div className={s.mainEmpty}>
            <span>新建需求事项</span>
          </div>
        )}
        {(expand || type === 'backlog') && children}
        <div className={s.operate}></div>
      </div>
      {
        (expand === true || type === 'backlog') && (
          <>
            {
              addFlag
                ?
                renderAddMenu()
                :
                <div className={s.addFooter} >
                  <div onClick={changeAddFlag}>
                    <Icon type='plus' />
                    <span >新建事项</span>
                  </div>
                </div>
            }
          </>
        )
      }
    </div>
  )
}

export default Collapse
