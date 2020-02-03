import { useState, useEffect } from 'react'
import s from './index.less'
import { Icon, Menu, Dropdown } from 'antd'

const Detail = (props) => {
    const detailId = props.match.params.id
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const resData = [
            {
                id: detailId,
                name: ''
            }
        ]
        setData(resData)
        setTitle(props.location.state.name)
    }, [detailId, props.location.state.name])

    const goback = () => props.history.goBack()

    const handleInput =()=>{

    }

    const deleteItem = () => {

    }

    const dropDownMenu = (
        <Menu>
            <Menu.Item key='0' onClick={deleteItem}>删除</Menu.Item>
        </Menu>
    )

    return (
        <div className={s.root}>
            <div type="close-circle" theme="twoTone" onClick={goback} className={s.closeBtn}></div>
            <div className={s.detailRoot}>
                <div className={s.detailHeaderWrapper}>
                    <div className={s.detailHeader}>
                        <div className={s.detailMenu}>
                            <div className={s.detailId}>
                                <span className={s.code}>
                                    <Icon type="filter" theme="twoTone" />&nbsp;#{detailId}
                                </span>
                                <span></span>
                            </div>
                            <div className={s.detailOpe}>
                                <div></div>
                                <div></div>
                                <div className={s.trigger}>
                                    <Dropdown overlay={dropDownMenu} trigger={['click']}>
                                        <Icon type='ellipsis' onClick={e => e.stopPropagation()} />
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className={s.titleContainer}>
                            <input
                                type='text'
                                defaultValue=''
                                // value={title}
                                onChange={handleInput}
                                className={s.titleInput} />
                        </div>
                        <div className={s.briefInfo}>
                            <div>left</div>
                            <div>right</div>
                        </div>
                    </div>
                </div>

                <div className={s.detailBody}>
                    {/* <div>title</div>
                    <div>main</div> */}
                </div>
            </div>
        </div>
    )
}

export default Detail