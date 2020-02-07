import { useState } from 'react'
import s from './index.less'
import { Icon, Tag, Dropdown, Menu, Divider, Tooltip, Modal, Button, DatePicker } from 'antd'
import cn from 'classnames'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const Collapse = ({
  className,
  children,
  type,
  iterContainerId = null,
  delIterContainer,
  name,
  issuesNum,
  expand,
  onExpand,
  status,
  changeStatus,
  startDate,
  endDate,
  handleAdd,
}) => {
  const [addFlag, setAddFlag] = useState(false)
  const [addValueFlag, setAddValueFlag] = useState(false)
  const [inputValue, setInputValue] = useState('')
  /**
   * @ 0 - begin 1 - delete 2-complete
   */
  const [modalFlag, setModalFlag] = useState(null)

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
      {
        status
          ? <Menu.Item key='0' onClick={(eve) => {
            eve.domEvent.stopPropagation()
            setModalFlag(2)
          }}>完成迭代</Menu.Item>
          : <Menu.Item key='0' onClick={(eve) => {
            eve.domEvent.stopPropagation()
            if (!status) {
              setModalFlag(0)
            }
          }} style={status ? { cursor: " not-allowed" } : null}>开始迭代</Menu.Item>
      }
      <Menu.Divider />
      <Menu.Item key='2' onClick={(eve) => eve.domEvent.stopPropagation()}>编辑迭代</Menu.Item>
      <Menu.Divider />
      <Menu.Item key='3' onClick={eve => {
        eve.domEvent.stopPropagation()
        setModalFlag(1)
      }} style={{ color: 'red' }}>删除迭代</Menu.Item>
    </Menu >
  )

  const hanldeStart = (eve) => {
    eve.stopPropagation()
    changeStatus(iterContainerId, 1)
    setModalFlag(null)
  }

  const onChange = (date, dateString) => {
  }

  const renderModal = () => {
    return (
      <Modal
        title={null}
        visible={modalFlag === 0 || modalFlag === 1 || modalFlag === 2}
        closable={false}
        footer={null}
        className={s.modal}
        onCancel={(eve) => eve.stopPropagation()}
      >
        {
          modalFlag === 1 && (
            <>
              <div className={s.modalTitle}>删除迭代</div>
              <div className={s.modalMsg}>提示：只会删除当前迭代，迭代中涉及的事项将被移至未规划，此操作不可撤销，是否确认？</div>
              <div className={s.modalBtn}>
                <Button
                  type='primary'
                  className={cn(s.btn, s.leftBtn)}
                  onClick={() => delIterContainer(iterContainerId)}
                >确认删除</Button>
                <Button
                  type='primary'
                  className={cn(s.btn, s.rightBtn)}
                  onClick={(eve) => {
                    eve.stopPropagation()
                    setModalFlag(null)
                  }}>取消</Button>
              </div>
            </>
          )
        }
        {
          modalFlag === 0 && (
            <>
              <div className={s.modalTitle}>开始迭代</div>
              <div className={s.modalMsgTime}>迭代开始时间</div>
              <div>
                <DatePicker
                  placeholder='请选择迭代开始时间'
                  defaultValue={moment()}
                  format={'YYYY-MM-DD'}
                  onChange={onChange}
                  suffixIcon={<Icon type='down' />}
                  className={s.datePick} />
              </div>
              <div className={s.modalMsgTime}>迭代结束时间</div>
              <div >
                <DatePicker
                  placeholder='请选择迭代结束时间'
                  onChange={onChange}
                  suffixIcon={<Icon type='down' />}
                  className={s.datePick} />
              </div>
              <div className={s.modalBtn}>
                <Button
                  type='primary'
                  className={cn(s.btn, s.beginBtn)}
                  onClick={(eve) => hanldeStart(eve)}
                >确认并开始</Button>
                <Button
                  type='primary'
                  className={cn(s.btn, s.rightBtn)}
                  onClick={(eve) => {
                    eve.stopPropagation()
                    setModalFlag(null)
                  }}>取消</Button>
              </div>
            </>
          )
        }
        {
          modalFlag === 2 && (
            <>
              <div className={s.modalTitle}>完成迭代</div>
              <div className={s.modalMsgTime}>请再次确认当前迭代内所有事项是否都已完成？</div>
              <div className={s.modalMsgTime}>确认迭代完成时间</div>
              <div>
                <DatePicker
                  placeholder='请选择迭代完成时间'
                  defaultValue={moment()}
                  format={'YYYY-MM-DD'}
                  onChange={onChange}
                  suffixIcon={<Icon type='down' />}
                  className={s.datePick} />
              </div>
              <div className={s.modalBtn}>
                <Button
                  type='primary'
                  className={cn(s.btn, s.sureBtn)}
                  onClick={() => delIterContainer(iterContainerId)}
                >确认完成</Button>
                <Button
                  type='primary'
                  className={cn(s.btn, s.rightBtn)}
                  onClick={(eve) => {
                    eve.stopPropagation()
                    setModalFlag(null)
                  }}>取消</Button>
              </div>
            </>
          )
        }
      </Modal>
    )
  }

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
          renderModal('delete')
        }
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
                  <Icon type='ellipsis' onClick={e => e.stopPropagation()} className={s.moreMenu} />
                </Dropdown>
                {status === 1 && (
                  <div className={s.date}>
                    {startDate} - {endDate}
                  </div>
                )
                }
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
