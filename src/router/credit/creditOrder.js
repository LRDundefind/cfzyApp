
const storage = resolve => require([ '@/view/goods/storage'],resolve);
const creditOrder = resolve => require([ '@/view/credit/creditOrder'],resolve);
const repayment = resolve => require([ '@/view/credit/repayment'],resolve);
const repayOrder = resolve => require([ '@/view/credit/repayOrder'],resolve);
const cashAccount = resolve => require([ '@/view/credit/cashAccount'],resolve);
const orderClearing = resolve => require([ '@/view/credit/orderClearing'],resolve);

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

]