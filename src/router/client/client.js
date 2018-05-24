// import client from '@/view/client/index'
// import client_detail from '@/view/client/index_detail'
// import index_change from '@/view/client/index_change'
// import record from '@/view/client/record'

const client = resolve => require([ '@/view/client/index'],resolve)
const client_detail = resolve => require([ '@/view/client/index_detail'],resolve)
const index_change = resolve => require([ '@/view/client/index_change'],resolve)

const orderPay_record = resolve => require([ '@/view/client/orderPay_record'],resolve)
const orderRecord = resolve => require([ '@/view/client/orderRecord'],resolve)
const payRecord = resolve => require([ '@/view/client/payRecord'],resolve)

// import orderPay_record from '@/view/client/orderPay_record'
// import orderRecord from '@/view/client/orderRecord'
// import payRecord from '@/view/client/payRecord'

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
    }, {
        //消费和还款记录
        path: 'orderPay_record',
        name: 'orderPay_record',
        components: {
            mainView: resolve => require(['@/view/client/orderPay_record'], resolve)
        },
        meta: {
            showFooter: false
        },
        redirect: 'orderPay_record/record/:cid/:come',
        children: [
            {
                path: 'record/:cid/:come',
                name: 'record',
                components: {
                    orderpayRouteView: resolve => require(['@/view/client/orderRecord'], resolve)
                },
                meta: {
                    showFooter: false
                }
            }, {
                path: 'payss/:cid/:come',
                name: 'payss',
                components: {
                    orderpayRouteView: resolve => require(['@/view/client/payRecord'], resolve)
                },
                meta: {
                    showFooter: false
                }
            }
        ]
    },
]
