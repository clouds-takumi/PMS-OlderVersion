import style from './add-item.less'
import Item from './each-item'
import { useState } from 'react'

export default ({ handleAdd, children }) => {
    const [flag, setFlag] = useState(false)
    const handleCancel = () => { setFlag(false) }
    const changeAddFlag = () => { setFlag(true) }
    return (
        <>
            {
                flag ?
                    <Item add="true" handleCancel={handleCancel} handleAdd={handleAdd} />
                    : <div className={style.footer} onClick={changeAddFlag}>新建事项</div>
            }
        </>
    )

}