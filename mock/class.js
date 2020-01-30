const dataList = {
    code: 0,
    msg: null,
    data: [
        {
            code: 141, name: "tax1", assign: null, watchers: [], creator: {
                id: 163471,
                status: 1, avatar: '', name: '', email: ''
            }
        },
        {
            code: 142, name: "tax2", assign: null, watchers: [], creator: {
                id: 163471,
                status: 1, avatar: '', name: '', email: ''
            }
        }
    ]
}

export default {
    'get /api/main/class': dataList
}
