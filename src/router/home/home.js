import home from '@/view/home/index'
import blackList from '@/view/home/blackList'
import ownerChoice from '@/view/home/ownerChoice'

//暂存订单
import temporaryOrderList from '@/view/home/temporaryOrderList'
//暂存订单详情
import temporaryOrderDetail from '@/view/home/temporaryOrderDetail'
//车次列表
import settlementList from '@/view/home/settlementList'
//车次详情
import settlementDetail from '@/view/home/settlementDetail'

export default [{
	path: 'home',
	name: 'home',
	components: {
		mainView: home
	}
},{
    path: 'blackList/:id',
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
}
]
