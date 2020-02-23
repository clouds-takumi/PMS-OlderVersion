import { Component } from 'react'
import s from './index.less'
import cn from 'classnames'
import { Icon, Divider, Drawer, Input } from 'antd'
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

    goback = () => this.setState({ modalFlag: false })

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
                placement="left"
                width='100%'
                visible
                closable={false}
                className={s.drawer}>
                <div className={s.drawerInner}>
                    <div className={s.leftContainer}>
                        <div onClick={this.goback} className={s.closeBtn}>
                            <Icon type='arrow-left' />
                        </div>
                    </div>
                    <div className={s.rightContent}>
                        <div className={s.info}>
                            <div className={s.title}>
                                <span>填写项目基本信息</span>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ marginRight: '32px' }}>
                                    <div className={s.item}>
                                        <div className={s.subtitle}>项目名称</div>
                                        <Input />
                                        <span className={s.tips}>可以使用中英文、数字、空格组合</span>
                                    </div>
                                    <div className={s.item}>
                                        <div className={s.subtitle}>项目标签</div>
                                        <Input />
                                        <span className={s.tips}>建议选择最多不超过三个</span>
                                    </div>
                                    <div className={s.item}>
                                        <div className={s.subtitle}>项目描述</div>
                                        <span className={s.tips}>
                                            <Input.TextArea
                                                rows={4}
                                                placeholder='描述内容限制在100字以内（选填）'
                                                className={s.text} />
                                        </span>
                                    </div>
                                    <button className={cn(s.btn, s.leftBtn)}>完成创建</button>
                                    <button className={s.btn} onClick={this.goback}>取消</button>
                                </div>
                                <div className={s.infoPic}>
                                    <span className={s.picTitle}>项目封面</span>
                                    <div className={s.bcImg}></div>
                                    <button className={s.changeBtn} >更改封面</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                        <Icon type='plus' style={{ cursor: 'pointer' }} onClick={() => this.setState({ modalFlag: true })} />
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