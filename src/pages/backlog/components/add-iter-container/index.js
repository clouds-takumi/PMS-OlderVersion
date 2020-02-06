import { useState } from 'react'
import { Input, message } from 'antd'
import s from './index.less'

const AddIterContainer = ({ handleAddIter, emptyFlag }) => {
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
        setValue('')
        setBtnFlag(false)
    }

    const handleInput = (e) => {
        setValue(e.target.value)
        setBtnFlag(true)
        if (!e.target.value) {
            setBtnFlag(false)
        }
    }

    const handleItemAdd = () => {
        if (!!value) {
            handleAddIter(value)
            setValue('')
            message.success('增加迭代成功')
        }
    }

    return (
        <>
            {
                emptyFlag && (
                    <div className={s.emptyRoot}>
                        <div className={s.emptyContainer}>
                            <div className={s.empthBg}></div>
                            <div className={s.title}>当前没有迭代项</div>
                            <div className={s.subTitle}>
                                <span className={s.subTitleBtn} onClick={changeFlag}>创建迭代</span>
                                ，将 backlog 中的事项拖入迭代中，完成迭代的准备。
                            </div>
                        </div>
                    </div>
                )

            }
            {
                flag
                    ? (
                        <div className={s.addcontainer} onClick={changeFlag}>
                            <span className={s.btn}>+ 创建迭代 +</span>
                        </div>
                    )
                    : (
                        <div className={s.info}>
                            <Input
                                className={s.infoInput}
                                placeholder='请输入容器标题，可按回车创建'
                                size='small'
                                value={value}
                                onPressEnter={handleItemAdd}
                                onChange={handleInput}
                            />
                            <span className={s.inforight}>
                                <div className={s.infoBtn} onClick={handleItemAdd} style={cur}>
                                    创建
                            </div>
                                <div className={s.infoBtn} onClick={handleCancel}>
                                    取消
                            </div>
                            </span>

                        </div>
                    )
            }
        </>

    )
}

export default AddIterContainer