import client from '@/view/client/index'
import client_detail from '@/view/client/index_detail'
import index_change from '@/view/client/index_change'
import orderPay_record from '@/view/client/orderPay_record'
import orderRecord from '@/view/client/orderRecord'
import payRecord from '@/view/client/payRecord'

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
            mainView: orderPay_record
        },
        meta: {
            showFooter: false
        },
        redirect: 'orderPay_record/record',
        children: [
            {
                path: 'record',
                name: 'record',
                components: {
                    orderpayRouteView: orderRecord
                },
                meta: {
                    showFooter: false
                }
            }, {
                path: 'pays',
                name: 'pays',
                components: {
                    orderpayRouteView: payRecord
                },
                meta: {
                    showFooter: false
                }
            }
        ]
    }
]
