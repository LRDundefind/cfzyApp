import earning from '@/view/earning/index'
import orderList from '@/view/earning/orderList'
import orderDetail from '@/view/earning/orderDetail'

export default [
	{
		path: 'earning',
		name: 'earning',
		components: {
			mainView: earning
		}
	},{
		path:'earning/orderList/:id',
		name:'earning/orderList',
		components: {
			mainView: orderList
		},
		meta: {
			showFooter: false
		}
	},{
		path:'orderList/orderDetail/:id',
		name:'orderList/orderDetail',
		components: {
			mainView: orderDetail
		},
		meta: {
			showFooter: false
		}
	}
]