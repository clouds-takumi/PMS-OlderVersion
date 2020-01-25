import { PureComponent } from 'react'
import style from './index.less'
import Item from './each-item'

const Add = () => {
    return (
        <div>
            <h2>add - div</h2>
        </div>
    )
}

class DraggableContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            addFlag: false
        }
    }

    changeAddFlag = () => {
        this.setState({
            addFlag: true
        })
    }

    handleCancel = () => {
        this.setState({
            addFlag: false
        })
    }

    handleAdd = (item) => {
        const old = this.state.dataList
        this.setState({
            dataList: [...old, item]
        })
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
        const { dataList, addFlag } = this.state
        const ln = dataList.length
        return (
            <div className={style.container}>
                <div className={style.header}>
                    <span className={style.icon}></span>
                    <span>Main</span>
                    <span className={style.count}>{ln}个事项</span>
                    <span className={style.divider}></span>
                    <span >?</span>
                    <span className={style.classify}><span >未定位</span></span>
                </div>
                {
                    dataList.map((item, index) => {
                        return <Item key={item.id + index} data={item} />
                    })
                }
                {
                    addFlag ?
                        <Item add="true" handleCancel={this.handleCancel} handleAdd={this.handleAdd} />
                        : <div className={style.footer} onClick={this.changeAddFlag}>新建事项</div>
                }
            </div>
        );
    }
}

export default DraggableContainer;