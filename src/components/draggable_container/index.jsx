import DraggableContainer from './drag-container'
import style from './index.less'

export default () => {
    return (
        <div className={style.proContainer}>
            <DraggableContainer />
            <DraggableContainer name='new add' />
        </div>
    )
}