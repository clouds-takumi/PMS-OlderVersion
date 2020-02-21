import { Component } from 'react'
import s from './index.less'
import { Icon, Divider, Drawer } from 'antd'
import { reqProjects } from '../service'

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            modalFlag: false
        }

        document.getElementsByTagName("title")[0].innerText = '项目列表'

    }

    handleAdd = () => {
        alert('add')
    }

    onClose = () => this.setState({ modalFlag: false })

    fetchData = async () => {
        const resData = await reqProjects()
        if (resData.lists) {
            this.setState({ projects: resData.lists })
        }
    }

    componentDidMount() { this.fetchData() }

    renderModal = () => {
        return (
            <Drawer
                title=""
                placement="top"
                closable
                onClose={this.onClose}
                keyboard
                height='100%'
                // maskStyle={s.drawer}
                visible>
                <div className={s.drawer}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </div>
            </Drawer>
        )
    }

    render() {
        const { projects, modalFlag } = this.state
        return (
            <div className={s.projectsRoot}>
                <div className={s.leftNav}>
                    <div className={s.header}>
                        <div className={s.title}>项目</div>
                        <Icon type='plus' style={{ cursor: 'pointer' }} onClick={this.handleAdd} />
                    </div>
                    <div className={s.prolists}>
                        <div className={s.proItem} style={{ backgroundColor: '#dadfe6' }}>
                            <Icon type="switcher" style={{ marginRight: '8px', fontSize: '12px' }} />
                            <div>我参与的</div>
                        </div>
                    </div>
                </div>

                <div className={s.rightContent}>
                    <div>
                        <div className={s.contentTitle}>所有项目（{projects.length}）</div>
                    </div>
                    <Divider type='horizontal' />
                    <div className={s.mangeLists}>
                        <div onClick={() => this.setState({ modalFlag: true })}>
                            <div className={s.mItem}>
                                <div className={s.itemImg}>
                                    <Icon type='plus' />
                                </div>
                                <div className={s.itemName}>新建项目</div>
                            </div>
                        </div>
                        {
                            projects.map((item, index) => {
                                return (
                                    <div onClick={() => alert('jump')}>
                                        <div className={s.mItem}>
                                            <div className={s.itemImg}>
                                                <div>img</div>
                                            </div>
                                            <div className={s.itemName}>示例项目一</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {
                    modalFlag && this.renderModal()
                }
            </div>
        );
    }
}

export default Projects