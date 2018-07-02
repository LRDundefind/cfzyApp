
const storage = resolve => require([ '@/view/goods/storage'],resolve);
const creditOrder = resolve => require([ '@/view/credit/creditOrder'],resolve);
const repayment = resolve => require([ '@/view/credit/repayment'],resolve);
const repayOrder = resolve => require([ '@/view/credit/repayOrder'],resolve);
const cashAccount = resolve => require([ '@/view/credit/cashAccount'],resolve);
const orderClearing = resolve => require([ '@/view/credit/orderClearing'],resolve);

const knot = resolve => require([ '@/view/credit/knot'],resolve);
const orderKnot = resolve => require([ '@/view/credit/orderKnot'],resolve);
const creditKnot = resolve => require([ '@/view/credit/creditKnot'],resolve);
const print = resolve => require([ '@/view/credit/print'],resolve);

export default [
    {
        path: 'creditOrder',
        name: 'creditOrder',
        components: {
            mainView: creditOrder
        },
        meta: {
            showFooter: false
        }
    },{
        path: 'repayment/:cid',
        name: 'repayment',
        components: {
            mainView: repayment
        },
        meta: {
            showFooter: false
        }
    },{
        path: 'repayOrder/:refundAmount',
        name: 'repayOrder',
        components: {
            mainView: repayOrder
        },
        meta: {
            showFooter: false
        }
    },{
        path: 'cashAccount',
        name: 'cashAccount',
        components: {
            mainView: cashAccount
        },
        meta: {
            showFooter: false
        }
    },{
        path: 'orderClearing/:oid',
        name: 'orderClearing',
        components: {
            mainView: orderClearing
        },
        meta: {
            showFooter: false
        }
    },
    {
        path:'knot',
        name:'knot',
        components: {
            mainView: knot
        },
        redirect: 'knot/orderKnot',
        children:[{
            path:'orderKnot',
            name:'orderKnot',
            components: {
                orderRouteView: orderKnot
            },
            meta: {
                showFooter: false
            }
        },{
            path:'creditKnot',
            name:'creditKnot',
            components: {
                orderRouteView: creditKnot
            },
            meta: {
                showFooter: false
            }
        }]
    },{
        path: 'print/:oid',
        name: 'print',
        components: {
            mainView: print
        },
        meta: {
            showFooter: false
        }
    },

]