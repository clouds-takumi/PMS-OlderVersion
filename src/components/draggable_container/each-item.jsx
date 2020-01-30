import style from './each-item.less'
import { Input } from 'antd'
import { useState } from 'react'
import { Avatar } from 'antd'

export default ({ data, add, handleCancel, handleAdd }) => {
    let username = 'J'
    const [flag, setFlag] = useState(false)
    const [value, setValue] = useState('')
    let curponiter = flag ? 'pointer' : 'not-allowed'
    let curcolor = flag ? '#4682B4' : '#bcc0c5'
    const cur = { cursor: curponiter, backgroundColor: curcolor, color: "white" }

    const handleInput = (e) => {
        setValue(e.target.value)
        setFlag(true)
        if (!e.target.value) {
            setFlag(false)
        }
    }

    const handleItemAdd = (e) => {
        if (!!value) {
            const item = { id: '100', title: value, level: 'middle', assign: 'd' }
            handleAdd(item)
            setValue('')
        }
    }
    const handleInputAdd = (e) => {
        if ((e.keyCode === 13) && !!value) {
            const item = { id: '100', title: value, level: 'middle', assign: 'd' }
            handleAdd(item)
            setValue('')
        }
    }
    if (!add) {
        return (
            <div className={style.item}>
                <div className={style.header}>
                    {data.title}
                </div>
                <div className={style.info}>
                    <div className={style.infoId}>#{data.id}</div>
                    <div className={style.right}>
                        {
                            data.level ? <div className={style.levelIcon}>等级</div> : null
                        }
                        {
                            username ? <Avatar className={style.infoAva} size="small">Jane</Avatar>
                                : <Avatar className={style.infoAva} size="small" icon="user" />
                        }
                        {
                            data.assign ? <div className={style.infoAssigin}>未规类</div> : null
                        }

                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div className={style.add}>
                <span >add</span>
                <span className={style.divider}></span>
                <Input
                    placeholder="输入事件标题，可按回车创建"
                    size='small'
                    onChange={handleInput}
                    value={value}
                    onKeyUp={handleInputAdd}
                />
                <div className={style.btn} style={cur} onClick={() => handleItemAdd()} >创建</div>
                <div className={style.btn} onClick={() => handleCancel()}>取消</div>
            </div>
        )
    }

}