import DraggableContainer from './drag-container'
import AddContainer from './add-container'
import style from './index.less'
import { useState, useEffect } from 'react'
import { reqClassLists } from '../../services'
// import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer'
// import { List as VList } from 'react-virtualized/dist/commonjs/List'

export default () => {
    const [containerLists, setContainerLists] = useState(['dasd','fas'])

    const addContainer = (listTitle) => {
        const newContainer = { name: listTitle }
        setContainerLists([...containerLists, newContainer])
    }

    const delContainer = (e, index) => {
        e.stopPropagation()
        const newLists = [...containerLists]
        newLists.splice(index, 1)
        setContainerLists(newLists)
    }

    useEffect(() => {
        (async () => {
            const res = await reqClassLists()
            setContainerLists(res.data)
        })()
    }, [])

    // const renderContainer = (item, index) => {
    //     return (
    //         <div className={style.eachcontainer} key={index}>
    //             <DraggableContainer
    //                 name={item.name} id={index} delContainer={delContainer}
    //             />
    //         </div>
    //     )
    // }

    return (
        <div className={style.proContainer}>
            <DraggableContainer name='Main' />
            <div>
                {
                    containerLists.map((item, index) => {
                        return (
                            <div className={style.eachcontainer} key={index}>
                                <DraggableContainer
                                    name={item.name} id={index} delContainer={delContainer}
                                />
                            </div>
                        )
                    })
                }


                {/* {
                    !!containerLists && (
                        <div style={{ width: '500px', height: '580px' }}>
                            {

                                <AutoSizer>
                                    {({ width = 500, height = 800 }) => (
                                        <VList
                                            width={width}
                                            height={height}
                                            overscanRowCount={20}
                                            rowCount={containerLists.length}
                                            rowHeight={200}
                                            rowRenderer={renderContainer}
                                        />
                                    )}
                                </AutoSizer>

                            }
                        </div>
                    )
                } */}
                <AddContainer addContainer={addContainer} />
            </div>

        </div >
    )
}