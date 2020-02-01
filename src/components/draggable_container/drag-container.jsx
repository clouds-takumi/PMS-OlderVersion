import { PureComponent } from 'react'
import style from './drag-container.less'
import Item from './each-item'
import AddItem from './add-item'
import { reqMainLists, resMainLists } from '../../services'
import { message } from 'antd'
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer'
import { List as VList } from 'react-virtualized/dist/commonjs/List'

class DraggableContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mainData: [],
            iterData: [],
            show: false,
            showDelList: false
        }
    }

    handleAdd = (item) => {
        const old = this.state.mainData
        const newdata = [...old, item]
        resMainLists(newdata).then(res => {
            return this.reqData()
        }).then(res => {
            return this.setState({ mainData: res })
        }).then(res => {
            message.success('更新成功')
        })
    }

    reqData = async () => {
        const data = await reqMainLists()
        return data.data
    }

    changeArrow = () => {
        this.setState({ show: !this.state.show })
    }

    handleshowDelList = (e) => {
        e.stopPropagation()
        this.setState({ showDelList: true })
    }

    componentDidMount() {
        reqMainLists().then((res) => {
            this.setState({ mainData: res.data })
        })
        const { id } = this.props
        if (id === 0) {
            this.setState({ show: true })
        }
    }

    render() {
        let { mainData, iterData, containerName, show, showDelList } = this.state
        containerName = !!this.props.name ? this.props.name : ''
        const ln = mainData.length
        const iln = iterData.length
        const { id, delContainer } = this.props

        const renderItem = ({ index, key }) => {
            return <Item key={mainData[index].id} data={mainData[index]} />
        }

        return (
            <div className={style.wrapper}>
                <div className={style.container} >
                    <div className={style.header} onClick={this.changeArrow}>
                        {
                            containerName === 'Main' ?
                                <span className={`${style.iconMain}`}></span>
                                : (show) ? <span className={style.icondown}></span>
                                    : <span className={style.iconright}  ></span>

                        }
                        <span>{containerName}</span>
                        {
                            containerName === 'Main' && ln >= 0 && (<span className={style.count}>{ln}个事项</span>)
                        }
                        {
                            containerName !== 'Main' && iln >= 0 && (<span className={style.count}>{iln}个事项</span>)
                        }
                        <span className={style.divider}></span>
                        {
                            containerName === 'Main' ? <span >?</span> :
                                (
                                    <>
                                        <span onClick={(event) => this.handleshowDelList(event)}>...</span>
                                        {
                                            showDelList ? (
                                                <>
                                                    <div className={style.delList}>
                                                        <span onClick={(e) => delContainer(e, id)}>删除</span>
                                                    </div>
                                                </>
                                            ) : null

                                        }
                                    </>
                                )
                        }

                        <span className={style.classify}><span >未定位</span></span>
                    </div>
                    {
                        containerName === 'Main' && ln === 0 && (
                            <div className={style.mainEmpty}>
                                <span>新建需求事项</span>
                            </div>
                        )
                    }
                    {
                        containerName !== 'Main' && iln === 0 && show && (
                            <div className={style.mainEmpty}>
                                <span>从Main中拖动需求事项到此处进行分类</span>
                            </div>
                        )
                    }
                    {
                        containerName === 'Main' && (
                            <>
                                {/* {
                                    mainData.map((item, index) => {
                                        return <Item key={item.id + index} data={item} />
                                    })
                                } */}

                                <div style={{ height: '500px' }}>
                                    <AutoSizer >
                                        {({ width = 500, height = 800 }) => (
                                            <VList
                                                width={width}
                                                height={height}
                                                overscanRowCount={20}
                                                rowCount={mainData.length}
                                                rowHeight={200}
                                                rowRenderer={renderItem}
                                            />
                                        )}
                                    </AutoSizer>
                                </div>

                                <AddItem handleAdd={this.handleAdd} />
                            </>
                        )
                    }
                    {
                        (containerName !== 'Main' && show) && (
                            <>
                                {
                                    iterData.map((item, index) => {
                                        return <Item key={item.id + index} data={item} />
                                    })
                                }
                                <AddItem handleAdd={this.handleAdd} />
                            </>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default DraggableContainer;