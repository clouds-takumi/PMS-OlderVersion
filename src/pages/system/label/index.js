import { PureComponent } from 'react'
import s from './index.less'
import { Table, Divider, Tag, Button, message, Modal, Input, Icon } from 'antd'
import { tags } from './mock.data'

class Label extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            tags,
            curTag: null,
            loading: false,
            modalFlag: null,
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

    renderFooter = () => <Button type='primary' onClick={this.tagCreate}>新建</Button>

    closeModal = () => this.setState({ modalFlag: null })

    handleSure = () => { }

    renderModal = (type, tag) => (
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
                                &nbsp;#{tag.id}
                            </div>
                        )
                    }
                    <div className={s.info}>
                        <span className={s.infoTitle}>标签名称</span>
                        {
                            type === 'edit' && <Input placeholder={tag.name} />
                        }
                        {
                            type === 'create' && <Input />
                        }
                    </div>
                    <div className={s.info}>
                        <span className={s.infoTitle}>标签颜色</span>
                        {
                            type === 'edit' && <Input placeholder={tag.color} />
                        }
                        {
                            type === 'create' && <Input />
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

    render() {
        const { tags, modalFlag, loading, curTag } = this.state
        return (
            <div>
                <div className={s.tagRoot}>
                    <Table
                        className={s.table}
                        loading={loading}
                        dataSource={tags}
                        columns={this.columns}
                        rowKey='id'
                        pagination={false}
                        footer={this.renderFooter} />
                </div>

                {
                    modalFlag === 0 && this.renderModal('edit', curTag)
                }
                {
                    modalFlag === 1 && this.renderModal('create')
                }
            </div>
        )
    }
}
export default Label