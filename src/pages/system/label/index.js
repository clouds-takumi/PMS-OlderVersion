import { PureComponent } from 'react'
import s from './index.less'
import InputColor from 'react-input-color'
import { Table, Divider, Tag, Button, message, Modal, Input, Icon } from 'antd'
import { reqTags } from '../../../services'
import { tags } from './mock.data'

class Label extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            tags,
            curTag: null,
            loading: false,
            modalFlag: null,
            color: {}
        }
        this.initColumns()
    }

    initColumns = () => {
        this.columns = [
            {
                title: '标签预览',
                key: 'preview',
                render: tag => (
                    <Tag style={{ backgroundColor: `${tag.color}` }}>{tag.name}</Tag>
                )
            },
            {
                title: '标签名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '标签颜色',
                dataIndex: 'color',
                key: 'color'
            },
            {
                title: '操作',
                key: 'operate',
                render: tag => {
                    return (
                        <>
                            <span className={s.operate} onClick={() => this.tagEdit(tag)}>编辑</span>
                            <Divider type='vertical' />
                            <span className={s.operate} onClick={() => this.tagDelete(tag.id)}>删除</span>
                        </>
                    )
                }
            },
        ]
    }

    tagEdit = tag => this.setState({ curTag: tag, modalFlag: 0 })

    tagDelete = (id) => { message.success(id) }

    tagCreate = () => this.setState({ modalFlag: 1 })

    closeModal = () => this.setState({ modalFlag: null })

    handleSure = () => { }

    handleSetColor = (color) => this.setState({ color })

    handleInputChange = (e) => {
        let newTag = JSON.parse(JSON.stringify(this.state.curTag))
        newTag.name = e.target.value
        this.setState({ curTag: newTag })
    }

    renderModal = type => (
        <Modal
            title={null}
            visible
            closable={false}
            footer={null}
            className={s.modal}
            onCancel={(eve) => eve.stopPropagation()}
        >
            <div onClick={(eve) => eve.stopPropagation()} className={s.modalRoot}>
                <div className={s.modalInfo}>
                    {
                        type === 'edit' && (
                            <div className={s.infoCode}>
                                <Icon type="filter" theme="twoTone" />
                                &nbsp;#{this.state.curTag.id}
                            </div>
                        )
                    }
                    <div className={s.info}>
                        <span className={s.infoTitle}>标签名称</span>
                        {
                            type === 'edit' && <Input
                                value={this.state.curTag.name}
                                onChange={this.handleInputChange}
                                className={s.nameInput} />
                        }
                        {
                            type === 'create' && <Input />
                        }
                    </div>
                    <div className={s.info}>
                        <span className={s.infoTitle}>标签颜色</span>
                        {
                            type === 'edit' && (
                                <>
                                    <span style={{ marginRight: '20px' }}>{this.state.color.hex}</span>
                                    <InputColor
                                        initialHexColor={this.state.curTag.color}
                                        onChange={this.handleSetColor}
                                        placement="right"
                                    />
                                </>
                            )
                        }
                        {
                            type === 'create' && (
                                <>
                                    <span style={{ marginRight: '20px' }}>{this.state.color.hex}</span>
                                    <InputColor
                                        initialHexColor="#5e72e4"
                                        onChange={this.handleSetColor}
                                        placement="right"
                                    />
                                </>
                            )
                        }
                    </div>
                </div>
                <div className={s.modalBtn}>
                    <Button type='primary' onClick={this.handleSure} className={s.btn}>确认</Button>
                    <Button type='primary' onClick={this.closeModal} className={s.btn}>取消</Button>
                </div>
            </div>
        </Modal>
    )

    fetchData = async () => {
        const res = await reqTags()
        console.log(res)
    }

    componentDidMount() { this.fetchData() }

    render() {
        const { tags, modalFlag, loading } = this.state
        return (
            <div className={s.tagRoot}>
                <div className={s.tagContainer}>
                    <Table
                        className={s.table}
                        loading={loading}
                        dataSource={tags}
                        columns={this.columns}
                        rowKey='id'
                        pagination={false} />
                </div>
                <Button type='primary' onClick={this.tagCreate} style={{ marginTop: '20px' }}>新建</Button>
                {
                    modalFlag === 0 && this.renderModal('edit')
                }
                {
                    modalFlag === 1 && this.renderModal('create')
                }
            </div>
        )
    }
}
export default Label