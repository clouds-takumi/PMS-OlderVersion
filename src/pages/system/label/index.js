import { PureComponent } from 'react'
import s from './index.less'
import InputColor from 'react-input-color'
import { Table, Divider, Tag, Button, message, Modal, Input, Popconfirm } from 'antd'
import { reqTags, addTag, delIdTag, updataIdTag } from '../../../services'

const initialTagColor = '#5e72e4'

class Label extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            loading: false,
            tagName: '',
            tagColor: initialTagColor,
            tagId: '',
            columns: [
              {
                title: '标签',
                key: 'preview',
                render: tag => (
                    <Tag color={tag.color}>{tag.name}</Tag>
                )
              },
              {
                  title: '操作',
                  key: 'operate',
                  render: tag => {
                      return (
                          <>
                              <span className={s.operate} onClick={() => this.tagEdit(tag)}>编辑</span>
                              <Divider type='vertical' />
                              <Popconfirm
                                title='确认删除?'
                                onConfirm={() => this.tagDelete(tag.id)}
                                okText="确定"
                                cancelText="取消"
                              >
                                <a>删除</a>
                              </Popconfirm>
                          </>
                      )
                  }
              },
            ],
            visible: false,
        }
    }

    tagEdit = ({id, name, color}) => this.setState({
      visible: true,
      tagName: name,
      tagColor: color,
      tagId: id,
    })

    tagDelete = id => {
      delIdTag(id).then(() => this.fetchData())
    }

    tagCreate = () => this.setState({ visible: true })

    closeModal = () => this.setState({ visible: false, tagName: '', tagColor: initialTagColor, tagId: '' })

    handleSure = async () => {
        const { tagName, tagColor, tagId } = this.state

        if (!tagName) {
          message.error('请输入标签名称')
          return
        }

        let res
        const params = {
          name: tagName,
          color: tagColor,
        }

        if (tagId) {
          res = await updataIdTag(tagId, params)
        } else {
          res = await addTag(params)
        }

        if (res) {
          this.closeModal()
          this.fetchData()
        }
    }

    handleTagnameChange = e => {
      this.setState({ tagName: e.target.value })
    }

    handleTagcolorChange = color => {
      this.setState({ tagColor: color.hex })
    }

    fetchData = async () => {
      this.setState({ loading: true })
      const resData = await reqTags()
      this.setState({ loading: false })
      if (resData) {
          this.setState({ tags: resData })
      }
    }

    componentDidMount() { this.fetchData() }

    render() {
        const { tags, loading, visible, tagName, tagColor, tagId, columns } = this.state
        return (
            <div className={s.tagRoot}>
                <Button type='primary' onClick={this.tagCreate} style={{ marginBottom: 20 }}>新建</Button>
                <div className={s.tagContainer}>
                    <Table
                        className={s.table}
                        loading={loading}
                        dataSource={tags}
                        columns={columns}
                        rowKey='id'
                        pagination={false} />
                </div>
                <Modal
                    title={null}
                    visible={visible}
                    closable={false}
                    footer={null}
                    className={s.modal}
                    onCancel={(eve) => eve.stopPropagation()}
                >
                    <div onClick={(eve) => eve.stopPropagation()} className={s.modalRoot}>
                        <div className={s.modalInfo}>
                        <div className={s.info}>
                              <span className={s.infoTitle}>预览</span>
                              {
                                tagName && <Tag color={tagColor}>{tagName}</Tag>
                              }
                            </div>
                            <div className={s.info}>
                                <span className={s.infoTitle}>名称</span>
                                <Input
                                  placeholder='请输入标签名'
                                  value={tagName}
                                  onChange={this.handleTagnameChange} />
                            </div>
                            <div className={s.info}>
                                <span className={s.infoTitle}>颜色</span>
                                <InputColor
                                  initialHexColor={tagColor}
                                  onChange={this.handleTagcolorChange}
                                  placement="right"
                                />
                            </div>

                        </div>
                        <div className={s.modalBtn}>
                            <Button type='primary' onClick={this.handleSure} className={s.btn}>{tagId ? '修改' : '创建'}</Button>
                            <Button type='primary' onClick={this.closeModal} className={s.btn}>取消</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Label
