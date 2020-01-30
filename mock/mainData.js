import mockjs from 'mockjs';

export default {
    'get /api/main': (req, res) => {
        res.send(mockjs.mock({
            'data|9': [{ 'id|+1': 90, title: '@city', 'level|1': ['low', 'heigh', 'middle'], 'assign|1': ['jane'] }]
        }))
    }
}
