import orders from '@/view/orders/index'
import ordersList from '@/view/orders/ordersList'
import ordersDetail from '@/view/orders/ordersDetail'

export default [
	{
		path: 'orders',
		name: 'orders',
		components: {
			mainView: orders
		}
	},{
		path:'orders/ordersList/:tid/:sell_day',
		name:'orders/ordersList',
		components: {
			mainView: ordersList
		},
		meta: {
			showFooter: false
		}
	},{
		path:'ordersList/ordersDetail/:oid',
		name:'ordersList/ordersDetail',
		components: {
			mainView: ordersDetail
		},
		meta: {
			showFooter: false
		}
	}
]