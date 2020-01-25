import { PureComponent } from 'react'
import style from './drag-container.less'
import Item from './each-item'
import AddItem from './add-item'

class DraggableContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            containerName: 'Main',
            show: true
        }
    }

    handleAdd = (item) => {
        const old = this.state.dataList
        this.setState({
            dataList: [...old, item]
        })
    }

    changeArrow = () => {
        this.setState({ show: !this.state.show })
    }

    componentDidMount() {
        this.setState({
            dataList: [
                { id: '90', title: 't1', level: 'low', assign: 'd' },
                { id: '91', title: 't2', level: 'low', assign: 'd' },
                { id: '92', title: 't3', level: 'high', assign: 'd' },
                { id: '93', title: 't4', level: 'low', assign: 'd' },
                { id: '94', title: 't5', level: 'low', assign: 'd' },
                { id: '95', title: 't6', level: 'high', assign: 'd' },
                { id: '96', title: 't7', level: 'low', assign: 'd' },
                { id: '97', title: 't8', level: 'middle', assign: 'd' },
                { id: '98', title: 't9', level: 'low', assign: 'd' },
                { id: '99', title: 't10', level: 'middle', assign: 'd' }
            ]
        })
    }

    render() {
        let { dataList, containerName, show } = this.state
        containerName = !!this.props.name ? this.props.name : containerName
        const ln = dataList.length
        return (
            <div className={style.container} >
                <div className={style.header} onClick={this.changeArrow}>
                    {
                        containerName === 'Main' ?
                            <span className={`${style.iconMain}`}></span>
                            : show ? <span className={style.icondown}></span>
                                : <span className={style.iconright}  ></span>

                    }
                    <span>{containerName}</span>
                    <span className={style.count}>{ln}个事项</span>
                    <span className={style.divider}></span>
                    <span >?</span>
                    <span className={style.classify}><span >未定位</span></span>
                </div>
                {
                    containerName === 'Main' && (
                        <>
                            {
                                dataList.map((item, index) => {
                                    return <Item key={item.id + index} data={item} />
                                })
                            }
                            <AddItem handleAdd={this.handleAdd} />
                        </>
                    )
                }
                {
                    (containerName !== 'Main' && show) && (
                        <>
                            {
                                dataList.map((item, index) => {
                                    return <Item key={item.id + index} data={item} />
                                })
                            }
                            <AddItem handleAdd={this.handleAdd} />
                        </>
                    )
                }


            </div>
        );
    }
}

export default DraggableContainer;