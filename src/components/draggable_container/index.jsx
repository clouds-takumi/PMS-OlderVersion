import DraggableContainer from './drag-container'
import AddContainer from './add-container'
import style from './index.less'
import { useState } from 'react'

export default () => {
    const [containerLists, setContainerLists] = useState(['da', 'das'])

    const addContainer = (listTitle) => {
        setContainerLists([...containerLists, listTitle])
    }

    const delContainer = (e, index) => {
        e.stopPropagation()
        const newLists = [...containerLists]
        newLists.splice(index, 1)
        setContainerLists(newLists)
    }

    return (
        <div className={style.proContainer}>
            <DraggableContainer />
            <div>
                {
                    containerLists.map((item, index) => {
                        return <DraggableContainer name={item} key={index} id={index} delContainer={delContainer} />
                    })
                }
                <AddContainer addContainer={addContainer} />
            </div>

        </div >
    )
}