import home from '@/view/home/index'
import blackList from '@/view/home/blackList'
import ownerChoice from '@/view/home/ownerChoice'

//暂存订单
import temporaryOrderList from '@/view/home/temporaryOrderList'
//暂存订单详情
import temporaryOrderDetail from '@/view/home/temporaryOrderDetail'

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
    path: 'temporaryOrderList/detail/:id',
    name: 'temporaryOrderList/detail',
    components: {
        mainView: temporaryOrderDetail
    },
    meta: {
        showFooter: false,
    }
}
]
