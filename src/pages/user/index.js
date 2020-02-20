import { Component } from 'react'
import s from './index.less'
import router from 'umi/router'
import Link from 'umi/link'
import { Icon, Empty, Timeline } from 'antd'

class User extends Component {
  state = {
    projects: [],
    type: '1'
  }

  changeRoute = () => {
    router.replace('/user/projects')
  }

  fetchData = async () => {
    // const resData = await reqAllProjects()
    if ("resData") {
      this.setState({
        projects: [
          { id: 1, name: '示例项目一', desc: '这是描述，示例项目的描述', path: '/p/p1', update_date: '2020/02/02' },
          { id: 2, name: '示例项目二', desc: '', path: '/p/p1', update_date: '2020/02/02' }
        ]
      })
    }
  }

  componentDidMount() { this.fetchData() }

  renderProContainer = () => {
    const { projects } = this.state
    return (
      <>
        {
          projects.map(item => (
            <Link key={item.id} to={item.path} className={s.eachpro}>
              <div className={s.proimg}></div>
              <div className={s.proinfo}>
                <div className={s.proname}>{item.name}</div>
                <div className={s.prodesc}>{item.desc ? item.desc : '未填写描述'}</div>
              </div>
            </Link>
          ))
        }
        <Link to='/user/projects' className={s.allpro}>全部项目<Icon type='right' /></Link>
      </>
    )
  }

  render() {
    const { type } = this.state

    return (
      <div className={s.userRoot}>

        <div className={s.projects}>
          <div className={s.titleContainer}><h3>我的项目</h3></div>
          <div className={s.projectsList}>
            {
              this.renderProContainer()
            }
          </div>
        </div>

        <div className={s.work}>
          <div className={s.titleContainer}>
            <h3 className={s.workname}>工作台</h3>
            <div className={s.switch}>
              <div className={s.sitem}
                onClick={() => { this.setState({ type: '1' }) }}
                style={type === '1' ? { backgroundColor: '#fff' } : null}>项目动态</div>
              <div className={s.sitem}
                onClick={() => { this.setState({ type: '2' }) }}
                style={type === '2' ? { backgroundColor: '#fff' } : null}>待处理事项</div>
            </div>
            <div className={s.divider}></div>
            <div className={s.select}>示例项目</div>
            <span className={s.extendBtn}></span>
          </div>

          <div className={s.workContent}>
            {
              type === '1' && (
                <>
                  <div className={s.workHeader}>
                    <div className={s.workItem}>全部动态</div>
                    <div className={s.workItem}>与我相关</div>
                  </div>
                  <div className={s.workMain}>
                    <Timeline mode="alternate" className={s.timeline}>
                      <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                      <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                      <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo.
    </Timeline.Item>
                      <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                      <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                      <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        Technical testing 2015-09-01
    </Timeline.Item>
                      <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                      <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                      <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo.
    </Timeline.Item>
                      <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                      <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                      <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        Technical testing 2015-09-01
    </Timeline.Item>
                      <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                      <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                      <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo.
    </Timeline.Item>
                      <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                      <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                      <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        Technical testing 2015-09-01
    </Timeline.Item>
                    </Timeline>
                  </div>
                </>
              )
            }
            {
              type === '2' && (
                <>
                  <div className={s.workHeader}>
                    <div className={s.workItem}>全部事项</div>
                  </div>
                  <div className={s.workMain}>
                    <Empty description={'暂时没有待处理事项'} />
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default User