// import client from '@/view/client/index'
// import client_detail from '@/view/client/index_detail'
// import index_change from '@/view/client/index_change'
// import record from '@/view/client/record'

const client = resolve => require([ '@/view/client/index'],resolve)
const client_detail = resolve => require([ '@/view/client/client_detail'],resolve)
const index_change = resolve => require([ '@/view/client/index_change'],resolve)
const record = resolve => require([ '@/view/client/record'],resolve)


export default [
    {
        path: 'client',
        name: 'client',
        components: {
            mainView: client
        }
    },
    {
        path: 'client/:type',
        name: 'client_order',
        components: {
            mainView: client
        },
        meta: {
            showFooter: false
        }
    },

    {
        path: 'client_detail/:ids',
        name: 'client_detail',
        components: {
            mainView: client_detail
        },
        meta: {
            showFooter: false
        }
    }, {
        //新增路由
        path: 'index_change/create/:type',
        name: 'index_change/create',
        components: {
            mainView: index_change
        },
        meta: {
            showFooter: false
        }
    }, {
        // 修改路由
        path: 'index_change/update/:id/:type',
        name: 'index_change/update',
        components: {
            mainView: index_change
        },
        meta: {
            showFooter: false
        }
    },  {

        // 记录
        path: 'record/:id',
        name: 'record',
        components: {
            mainView: record
        },
        meta: {
            showFooter: false
        }

    }
]
