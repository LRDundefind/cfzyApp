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
		path:'orders/ordersList/:id',
		name:'orders/ordersList',
		components: {
			mainView: ordersList
		},
		meta: {
			showFooter: false
		}
	},{
		path:'ordersList/ordersDetail/:id',
		name:'ordersList/ordersDetail',
		components: {
			mainView: ordersDetail
		},
		meta: {
			showFooter: false
		}
	}
]