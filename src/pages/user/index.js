import { Component } from 'react'
import s from './index.less'
import router from 'umi/router'
import Link from 'umi/link'
import { Icon, Empty, Select } from 'antd'
import { reqProjects } from './service'

const { Option } = Select

class User extends Component {
  state = {
    projects: [],
    type: '1',
    switchType: '1'
  }

  changeRoute = () => {
    router.replace('/user/projects')
  }

  fetchData = async () => {
    const resData = await reqProjects()
    /**
     * [
          { id: 1, name: '示例项目一', desc: '这是描述，示例项目的描述', path: '/p/p1', update_date: '2020/02/02' },
          { id: 2, name: '示例项目二', desc: '', path: '/p/p1', update_date: '2020/02/02' }
        ]
     */
    if (resData.lists) {
      this.setState({
        projects: resData.lists
      })
    }
  }

  componentDidMount() {
    document.getElementsByTagName("title")[0].innerText = '工作台';
    this.fetchData()
  }

  renderProContainer = () => {
    const { projects } = this.state
    return (
      <>
        {/* {
          projects.length === 0 && (
            <div className={s.allpro}>
              <div className={s.proinfo}>
                <div className={s.proname}>新建项目</div>
                <div className={s.prodesc}>未填写描述</div>
              </div>
            </div>

          )
        } */}
        {
          projects.map((item, index) => {
            if (index < 5) {
              return (
                <Link key={item.id} to='p/p1' className={s.eachpro}>
                  <div className={s.proimg}></div>
                  <div className={s.proinfo}>
                    <div className={s.proname}>{item.name}</div>
                    <div className={s.prodesc}>{item.desc ? item.desc : '未填写描述'}</div>
                  </div>
                </Link>
              )
            } else if (index === 6) {
              return (
                <div className={s.morePro}>......</div>
              )
            } else {
              return null
            }
          })
        }
        <Link to='/user/projects' className={s.allpro}>全部项目<Icon type='right' /></Link>
      </>
    )
  }

  renderAllContent = switchType => {
    return (
      <div className={s.mainDetail}>
        {
          switchType === '1' && (
            <>
              全部动态
            </>
          )
        }
        {
          switchType === '2' && (
            <>
              与我相关
            </>
          )
        }
      </div>
    )
  }

  render() {
    const { type, switchType, projects } = this.state

    return (
      <div className={s.userRoot}>

        <div className={s.projects}>
          <div className={s.titleContainer}><h3 className={s.workname}>我的项目</h3></div>
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
                style={type === '1' ? { backgroundColor: '#fff' } : null}>
                <Icon type="fund" style={type === '1' ? { marginRight: '4px', color: 'blue' } : { marginRight: '4px' }} />项目动态</div>
              <div className={s.sitem}
                onClick={() => { this.setState({ type: '2' }) }}
                style={type === '2' ? { backgroundColor: '#fff' } : null}>
                <Icon type="notification" style={type === '2' ? { marginRight: '4px', color: 'blue' } : { marginRight: '4px' }} />待处理事项</div>
            </div>
            <div className={s.divider}></div>
            <div className={s.select}>
              {
                projects.length > 0
                  ? (
                    <Select defaultValue={projects[0].name} style={{ width: 120 }} onChange={() => { }}>
                      {
                        projects.map(item => (
                          <Option value={item.name} key={item.id}>{item.name}</Option>
                        ))
                      }
                    </Select>
                  )
                  : (
                    <Select defaultValue='全部项目' style={{ width: 120 }} onChange={() => { }}></Select>
                  )
              }
            </div>
            <span className={s.extendBtn}></span>
          </div>

          <div className={s.workContent}>
            {
              type === '1' && (
                <>
                  <div className={s.workHeader}>
                    <div className={s.workItem}
                      onClick={() => this.setState({ switchType: '1' })}
                      style={switchType === '1' ? { borderBottom: "2px solid #355f9e" } : null}>全部动态</div>
                    <div className={s.workItem}
                      onClick={() => this.setState({ switchType: '2' })}
                      style={switchType === '2' ? { borderBottom: "2px solid #355f9e" } : null}>与我相关</div>
                  </div>
                  <div className={s.workMain}>
                    {
                      switchType !== '' && (
                        this.renderAllContent(switchType)
                      )
                    }
                  </div>
                </>
              )
            }
            {
              type === '2' && (
                <>
                  <div className={s.workHeader}>
                    <div className={s.workItem}
                      style={{ borderBottom: "2px solid #355f9e" }}>全部事项</div>
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