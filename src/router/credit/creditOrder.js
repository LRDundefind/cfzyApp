
const storage = resolve => require([ '@/view/goods/storage'],resolve);
const creditOrder = resolve => require([ '@/view/credit/creditOrder'],resolve);
const repayment = resolve => require([ '@/view/credit/repayment'],resolve);

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
    },

]