import style from './add-container.less'
import { useState } from 'react'
import { Input } from 'antd'

export default ({addContainer}) => {
    const [flag, setFlag] = useState(true)
    const [value, setValue] = useState('')
    const [btnFlag, setBtnFlag] = useState(false)

    let curponiter = btnFlag ? 'pointer' : 'not-allowed'
    let curcolor = btnFlag ? '#4682B4' : '#bcc0c5'
    const cur = { cursor: curponiter, backgroundColor: curcolor, color: "white" }

    const changeFlag = () => {
        setFlag(false)
    }

    const handleCancel = () => {
        setFlag(true)
    }

    const handleItemAdd = () => {
        if (!!value) {
            addContainer(value)
            setValue('')
        }
    }

    const handleInput = (e) => {
        setValue(e.target.value)
        setBtnFlag(true)
        if (!e.target.value) {
            setBtnFlag(false)
        }
    }

    return (
        <>
            {
                flag ? (
                    <div className={style.addcontainer}>
                        <div className={style.addmain}>
                            <div className={style.btn} onClick={changeFlag}>+ 创建 +</div>
                        </div>
                    </div>

                ) : (
                        <div className={style.info}>
                            <Input
                                placeholder='请输入容器标题，可按回车创建'
                                size='small'
                                className={style.infoInput}
                                value={value}
                                onPressEnter={handleItemAdd}
                                onChange={handleInput}
                            />
                            <span className={style.inforight}>
                                <div className={style.infoBtn} onClick={handleItemAdd} style={cur}>
                                    创建
                                </div>
                                <div onClick={handleCancel} className={style.infoBtn}>
                                    取消
                                </div>
                            </span>


                        </div>
                    )
            }
        </>
    )
}