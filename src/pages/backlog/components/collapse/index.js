import s from './index.less'
import { Icon, Tag, Dropdown, Menu, Divider, Tooltip } from 'antd'
import cn from 'classnames'

const Collapse = ({
  className,
  children,
  type,
  name,
  issuesNum,
  expand,
  onExpand,
  status,
  startDate,
  endDate,
}) => {
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
        {(expand || type === 'backlog') && children}
        <div className={s.operate}></div>
      </div>
    </div>
  )
}

export default Collapse
