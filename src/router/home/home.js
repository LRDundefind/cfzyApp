import home from '@/view/home/index'
import blackList from '@/view/home/blackList'
import ownerChoice from '@/view/home/ownerChoice'
import creditOrder from '@/view/home/creditOrder'
import creditOrderList from '@/view/home/creditOrderList'

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
    path: 'creditOrder',
    name: 'creditOrder',
    components: {
        mainView: creditOrder
    },
    meta: {
        showFooter: false,
    }
},{
    path: 'creditOrderList/:id',
    name: 'creditOrderList',
    components: {
        mainView: creditOrderList
    },
    meta: {
        showFooter: false,
    }
}
]
