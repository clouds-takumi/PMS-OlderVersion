import style from './each-item.less'
import { Input } from 'antd'
import { useState } from 'react'

export default ({ data, add, handleCancel, handleAdd }) => {
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
    const handleItemAdd = () => {
        if (!!value) {
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
                    <div>{data.id}</div>
                    <div className={style.right}>
                        <div>{data.level}</div>
                        <div>{data.assign}</div>
                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div className={style.add}>
                <span >add</span>
                <span className={style.divider}></span>
                <Input placeholder="输入事件标题，可按回车创建" size='small' onChange={handleInput} value={value} />
                <div className={style.btn} style={cur} onClick={handleItemAdd}>创建</div>
                <div className={style.btn} onClick={() => handleCancel()}>取消</div>
            </div>
        )
    }

}