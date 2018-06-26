// import home from '@/view/home/index'
// import blackList from '@/view/home/blackList'
// import ownerChoice from '@/view/home/ownerChoice'

// //暂存订单
// import temporaryOrderList from '@/view/home/temporaryOrderList'
// //暂存订单详情
// import temporaryOrderDetail from '@/view/home/temporaryOrderDetail'
// //车次列表
// import settlementList from '@/view/home/settlementList'
// //车次详情
// import settlementDetail from '@/view/home/settlementDetail'


const home = resolve => require([ '@/view/home/index'],resolve)
const blackList = resolve => require([ '@/view/home/blackList'],resolve)
const ownerChoice = resolve => require([ '@/view/home/ownerChoice'],resolve)
//暂存订单
const temporaryOrderList = resolve => require([ '@/view/home/temporaryOrderList'],resolve)
//暂存订单详情
const temporaryOrderDetail = resolve => require([ '@/view/home/temporaryOrderDetail'],resolve)
//车次列表
const settlementList = resolve => require([ '@/view/home/settlementList'],resolve)
//车次详情
const settlementDetail = resolve => require([ '@/view/home/settlementDe'],resolve)
//车次管理
const trainManagement = resolve => require([ '@/view/home/trainManagement'],resolve)
//车次结算
const carClearing = resolve => require([ '@/view/home/carClearing'],resolve)

export default [{
    path: 'home',
    name: 'home',
    components: {
        mainView: home
    }
},{
    path: 'blackList',
    name: 'blackList',
    components: {
        mainView: blackList
    },
    meta: {
        showFooter: false,
    }
},{
    path: 'ownerChoice',
    name: 'ownerChoice',
    components: {
        mainView: ownerChoice
    },
    meta: {
        showFooter: false,
    }
},{
    path: 'temporaryOrderList',
    name: 'temporaryOrderList',
    components: {
        mainView: temporaryOrderList
    },
    meta: {
        showFooter: false,
    }
},{
    path: 'temporaryOrderList/detail/:oid',
    name: 'temporaryOrderList/detail',
    components: {
        mainView: temporaryOrderDetail
    },
    meta: {
        showFooter: false,
    }
},{
    path: 'settlementList',
    name: 'settlementList',
    components: {
        mainView: settlementList
    },
    meta: {
        showFooter: false,
    }
},{
    path: 'settlementList/detail/:id',
    name: 'settlementList/detail',
    components: {
        mainView: settlementDetail
    },
    meta: {
        showFooter: false,
    }
},{
    path: 'trainManagement',
    name: 'trainManagement',
    components: {
        mainView: trainManagement
    },
    meta: {
        showFooter: false,
    }
},{
    path: 'carClearing',
    name: 'carClearing',
    components: {
        mainView: carClearing
    },
    meta: {
        showFooter: false,
    }
},//车次结算
]
