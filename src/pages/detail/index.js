import { useState, useEffect } from 'react'
import s from './index.less'
import { Icon } from 'antd'

const Detail = (props) => {
    const detailId = props.match.params.id
    const [data, setData] = useState([])

    useEffect(() => {
        const resData = [
            {
                id: detailId,

            }
        ]
        setData(resData)
    }, [detailId])

    const goback = () => props.history.goBack()

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
                                    <Icon type='more' />
                                </div>
                            </div>
                        </div>
                        <div className={s.titleContainer}>
                            <input type='text' value='title' className={s.titleInput} />
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